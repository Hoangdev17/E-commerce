import React, { useEffect, useState } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Typography, List, Card, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const SuccessPage = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const storedOrder = localStorage.getItem('lastestOrder');
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
      localStorage.removeItem('lastestOrder'); 
    }
  }, []);

  if (!order) return <div>Đang tải thông tin đơn hàng...</div>;

  const { items, shippingAddress, totalPrice, paymentMethod, status, createdAt, _id } = order;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '50px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <CheckCircleOutlined style={{ fontSize: 80, color: 'green' }} />
        <Title level={2}>Đặt hàng thành công!</Title>
        <Paragraph>Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đang được xử lý.</Paragraph>
      </div>

      <Card title="🧾 Thông tin đơn hàng" bordered style={{ marginBottom: 24 }}>
        <Paragraph><Text strong>Mã đơn hàng:</Text> {_id}</Paragraph>
        <Paragraph><Text strong>Ngày đặt:</Text> {new Date(createdAt).toLocaleString()}</Paragraph>
        <Paragraph><Text strong>Trạng thái:</Text> {status}</Paragraph>
        <Paragraph><Text strong>Phương thức thanh toán:</Text> {paymentMethod}</Paragraph>
      </Card>

      <Card title="📦 Sản phẩm đã đặt" bordered style={{ marginBottom: 24 }}>
        <List
          dataSource={items}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.productName}
                description={`Số lượng: ${item.quantity} | Giá: ${item.price.toLocaleString()}₫`}
              />
            </List.Item>
          )}
        />
        <Divider />
        <Paragraph style={{ textAlign: 'right' }}>
          <Text strong>Tổng tiền: </Text>
          <Text type="danger" strong>{totalPrice.toLocaleString()}₫</Text>
        </Paragraph>
      </Card>

      <Card title="🚚 Địa chỉ giao hàng" bordered>
        <Paragraph><Text strong>Họ tên:</Text> {shippingAddress.fullName}</Paragraph>
        <Paragraph><Text strong>Số điện thoại:</Text> {shippingAddress.phone}</Paragraph>
        <Paragraph><Text strong>Địa chỉ:</Text> {shippingAddress.address}</Paragraph>
      </Card>
    </div>
  );
};

export default SuccessPage;
