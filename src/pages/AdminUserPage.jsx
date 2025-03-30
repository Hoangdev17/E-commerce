import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Select } from 'antd';
import axios from 'axios';

const AdminUserPage = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  const token = localStorage.getItem('token');
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://e-commerce-1-6nku.onrender.com/api/user', axiosConfig);
      setUsers(res.data);
    } catch (error) {
      message.error('Lỗi khi tải danh sách người dùng!');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditSubmit = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(
        `https://e-commerce-1-6nku.onrender.com/api/user/${editingUser._id}`,
        values,
        axiosConfig
      );
      message.success('Cập nhật thành công!');
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      message.error('Cập nhật thất bại!');
    }
  };

  const columns = [
    {
      title: 'Tên người dùng',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
    },
    {
      title: 'Thao tác',
      render: (record) => (
        <Button
          type="link"
          onClick={() => {
            setEditingUser(record);
            form.setFieldsValue(record);
          }}
        >
          Sửa
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ fontSize: 20, marginBottom: 16 }}>Quản lý người dùng</h2>
      <Table 
        rowKey="_id" 
        columns={columns} 
        dataSource={users} 
        scroll={{ x: 'max-content' }} 
      />
      <Modal
        title="Chỉnh sửa người dùng"
        open={!!editingUser}
        onCancel={() => setEditingUser(null)}
        onOk={handleEditSubmit}
        okText="Lưu"
        cancelText="Hủy"
        bodyStyle={{ maxWidth: '100%', overflowX: 'hidden' }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên người dùng" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Vai trò" rules={[{ required: true }]}>
            <Select placeholder="Chọn vai trò">
                <Select.Option value="user">Người dùng</Select.Option>
                <Select.Option value="admin">Quản trị viên</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminUserPage;
