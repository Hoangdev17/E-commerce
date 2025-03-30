// src/pages/RegisterForm.jsx
import React from 'react';
import { Form, Input, Button, Divider, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest } from '../store/actions/authActions';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const onFinish = (values) => {
    dispatch(registerRequest(values));
    navigate('/');
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '60px auto',
        padding: '30px',
        border: '1px solid #f0f0f0',
        borderRadius: 8,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      }}
    >
      <Title level={3} style={{ textAlign: 'center' }}>Đăng ký</Title>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Tên người dùng"
          rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
        >
          <Input placeholder="Nhập tên của bạn" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>

        {error && <Text type="danger">{error}</Text>}

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Đăng ký
          </Button>
        </Form.Item>
      </Form>

      <Divider plain>Hoặc</Divider>

      <Text style={{ display: 'block', marginTop: 16 }}>
        Đã có tài khoản? <a href="/login">Đăng nhập</a>
      </Text>
    </div>
  );
};

export default RegisterForm;
