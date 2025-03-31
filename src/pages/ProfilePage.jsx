import React, { useEffect, useState } from 'react';
import {
  Card, Avatar, Button, Form, Input, message,
  Typography, List, Row, Col, Tag, Spin, Upload
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;

const ProfilePage = () => {
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userRes, orderRes] = await Promise.all([
          axios.get('https://e-commerce-1-6nku.onrender.com/api/user/profile', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('https://e-commerce-1-6nku.onrender.com/api/order/user/orders', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const userData = userRes.data.user;
        setUser(userData);

        form.setFieldsValue({
          name: userData.name,
          email: userData.email,
          profilePicture: userData.profilePicture,
        });

        setOrders(orderRes.data.orders);
      } catch (error) {
        message.error("Lỗi khi tải dữ liệu!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [form]);

  console.log(orders);

  const onFinish = async (values) => {
    try {
      if (!values.profilePicture && user?.profilePicture) {
        values.profilePicture = user.profilePicture;
      }

      const res = await axios.put(
        `https://e-commerce-1-6nku.onrender.com/api/user/${user._id}`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      message.success("Cập nhật thành công");
      setUser(res.data);
      setEditing(false);
    } catch {
      message.error("Cập nhật thất bại");
    }
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    setUploading(true);

    try {
      const res = await axios.post(
        'https://e-commerce-1-6nku.onrender.com/api/user/upload-avatar',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const imageUrl = res.data.profilePicture;
      setUser((prev) => ({ ...prev, profilePicture: imageUrl }));
      form.setFieldsValue({ profilePicture: imageUrl });
      message.success('Ảnh đại diện đã được cập nhật!');
    } catch (err) {
      message.error('Lỗi khi tải ảnh lên!');
    } finally {
      setUploading(false);
    }

    return false;
  };

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />;
  }

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card>
            {editing ? (
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                  <Avatar size={100} src={user?.profilePicture || 'https://i.pravatar.cc/150?img=8'} />
                </div>
                <Form.Item name="profilePicture" label="Ảnh đại diện">
                  <Upload showUploadList={false} beforeUpload={handleUpload}>
                    <Button icon={<UploadOutlined />} loading={uploading}>
                      {uploading ? 'Đang tải lên...' : 'Cập nhật ảnh đại diện'}
                    </Button>
                  </Upload>
                </Form.Item>
                <Form.Item name="name" label="Tên"><Input /></Form.Item>
                <Form.Item name="email" label="Email"><Input disabled /></Form.Item>
                <Form.Item>
                  <Row justify="space-between">
                    <Button type="primary" htmlType="submit">Lưu</Button>
                    <Button onClick={() => setEditing(false)}>Hủy</Button>
                  </Row>
                </Form.Item>
              </Form>
            ) : (
              <>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                  <Avatar size={100} src={user?.profilePicture || 'https://i.pravatar.cc/150?img=8'} />
                  <Title level={3}>{user?.name}</Title>
                  <Text type="secondary">{user?.email}</Text>
                </div>
                <Button type="primary" block onClick={() => setEditing(true)}>
                  Chỉnh sửa thông tin
                </Button>
              </>
            )}
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card title="🧾 Lịch sử đơn hàng">
            <List
              itemLayout="vertical"
              dataSource={orders}
              locale={{ emptyText: 'Chưa có đơn hàng nào' }}
              renderItem={(order) => (
                <Card key={order._id} title={`🧾 Đơn hàng #${order._id}`} style={{ marginBottom: 20 }}>
                  <p><Text strong>Ngày đặt:</Text> {new Date(order.createdAt).toLocaleDateString()}</p>
                  <div style={{ marginBottom: 8 }}>
                    <Text strong>Trạng thái: </Text>
                    {getOrderStatusTag(order.status)}
                  </div>
                  <List dataSource={order.items} renderItem={(item) => (
                    <List.Item key={item.productId}>
                      <Row style={{ width: '100%' }} gutter={16}>
                        <Col span={4}>
                          <img src={item.image || 'https://via.placeholder.com/80'} alt={item.productName} width="100%" style={{ borderRadius: 4 }} />
                        </Col>
                        <Col span={20}>
                          <Text strong>{item.productName}</Text>
                          <p>Số lượng: {item.quantity}</p>
                          <p>Giá: {item.price.toLocaleString()}₫</p>
                        </Col>
                      </Row>
                    </List.Item>
                  )} />
                </Card>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const getOrderStatusTag = (status) => {
  return {
    'Chờ xử lý': <Tag color="orange">Chờ xử lý</Tag>,
    'Đang giao hàng': <Tag color="blue">Đang giao hàng</Tag>,
    'Đã giao': <Tag color="green">Đã giao</Tag>,
    'Đã hủy': <Tag color="red">Đã hủy</Tag>,
  }[status] || <Tag color="default">Không xác định</Tag>;
};

export default ProfilePage;
