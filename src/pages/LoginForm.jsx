// src/pages/LoginForm.jsx
import React from 'react';
import { Form, Input, Button, Divider, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, loginSuccess } from '../store/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase";
import axios from 'axios';
import { GoogleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const onFinish = (values) => {
    dispatch(loginRequest(values));
    navigate('/');
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseToken = await result.user.getIdToken();
  
      // Call your backend API to verify the Firebase token and get user and JWT
      const response = await axios.post('https://e-commerce-1-6nku.onrender.com/api/auth/google-login', { firebaseToken });
      const { token, user } = response.data;
  
      // Dispatch loginSuccess action with user and token
      dispatch(loginSuccess(user, token));
  
      // Save token to localStorage for later use
      localStorage.setItem('token', token);
  
      // Navigate to the home page or other relevant page
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed, please try again.');
    }
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
      <Title level={3} style={{ textAlign: 'center' }}>Đăng nhập</Title>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
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
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>

      <Divider plain>Hoặc</Divider>

      <Button
        type="danger"  // Sử dụng type danger
        icon={<GoogleOutlined />}
        size="large"
        block
        style={{ backgroundColor: 'red', color: 'white' }}  // Thêm style trực tiếp
        onClick={handleGoogleLogin}
      >
        Đăng nhập với Google
      </Button>

      <Text style={{ display: 'block', marginTop: 16 }}>
        Chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
      </Text>
    </div>
  );
};

export default LoginForm;
