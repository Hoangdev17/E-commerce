// src/components/AdminSidebar.jsx
import { Layout, Menu, Avatar, Typography } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const { Sider } = Layout;
const { Text } = Typography;

const AdminSidebar = ({user1}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const user = {
    name: user1?.name || user1.user?.name,
    avatar:  user1?.profilePicture || user1.user?.profilePicture || 'https://i.pravatar.cc/150'
  } 

  const menuItems = [
    {
      key: '/admin',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/admin/users',
      icon: <UserOutlined />,
      label: 'Quản lý người dùng',
    },
    {
      key: '/admin/products',
      icon: <ShoppingOutlined />,
      label: 'Quản lý sản phẩm',
    },
    {
      key: '/admin/orders',
      icon: <ShoppingCartOutlined />,
      label: 'Quản lý đơn hàng',
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      breakpoint="lg"
      collapsedWidth="80"
      style={{ minHeight: '100vh' }}
      trigger={null}
    >
      <div
        style={{
            padding: '16px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
        >
        <Avatar
            size={collapsed ? 40 : 64}
            src={user.avatar}
            style={{ marginBottom: 8 }}
        />
        {!collapsed && (
            <Text style={{ color: '#fff', fontSize: '14px' }}>{user.name}</Text>
        )}
        </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={handleMenuClick}
        items={menuItems}
      />

      <div style={{ textAlign: 'center', padding: '12px 0' }}>
        <span
          onClick={toggleCollapsed}
          style={{ color: '#fff', fontSize: '18px', cursor: 'pointer' }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </span>
      </div>
    </Sider>
  );
};

export default AdminSidebar;
