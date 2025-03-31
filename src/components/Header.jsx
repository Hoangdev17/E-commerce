// src/components/Header.js
import React, { useState } from 'react';
import { Layout, Menu, Drawer, Button, Grid } from 'antd';
import { MenuOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Header } = Layout;
const { useBreakpoint } = Grid;

const AppHeader = () => {
  const user = useSelector((state) => state.auth.user);
  const screens = useBreakpoint();

  const [open, setOpen] = useState(false);
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('persist:root');
    localStorage.removeItem("redirectAfterLogin");
    window.location.href = '/login';
  };

  const menuItems = (
    <>
      <Link to="/">Home</Link>
      <Link to="/products">Product</Link>
      <Link to="/apple">About</Link>
      <Link to="/apple">Contact</Link>
      <Link to="/apple">Blog</Link>
    </>
  );

  const authItems = !user ? (
    <>
      <Menu.Item key="login">
        <Link to="/login">Đăng nhập</Link>
      </Menu.Item>
      <Menu.Item key="register">
        <Link to="/register">Đăng ký</Link>
      </Menu.Item>
    </>
  ) : (
    <>
      <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">Giỏ hàng</Link>
      </Menu.Item>
      <Menu.Item key="profile" >
        <Link to="/profile">
          <img
            src={user.user?.profilePicture || user?.profilePicture || 'https://i.pravatar.cc/30'}
            alt="avatar"
            style={{ width: 24, height: 24, borderRadius: '50%', marginRight: 8 }}
          />
          {user.user?.name || user?.name}
        </Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </>
  );

  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
      <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
        🏬 My Shop
      </div>

      {/* ✅ Menu for large screens */}
      {screens.md ? (
        <>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '30px' }}>
            {menuItems}
          </div>
          <Menu theme="dark" mode="horizontal" selectable={false} style={{ minWidth: 250 }}>
            {authItems}
          </Menu>
        </>
      ) : (
        <>
          {/* ✅ Button for mobile */}
          <Button type="text" icon={<MenuOutlined />} onClick={showDrawer} style={{ color: 'white' }} />
          <Drawer
            title="Menu"
            placement="right"
            onClose={onClose}
            open={open}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {menuItems}
            </div>
            <Menu mode="vertical">
              {authItems}
            </Menu>
          </Drawer>
        </>
      )}
    </Header>
  );
};

export default AppHeader;
