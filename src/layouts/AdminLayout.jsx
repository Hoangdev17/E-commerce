// src/layouts/AdminLayout.jsx
import { Layout, Spin } from 'antd';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import { useSelector } from 'react-redux';

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const user = useSelector((state) => state.auth.user);
  if (!user) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="80">
        <AdminSidebar user1={user}/>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <AdminHeader user={user}/>
        </Header>
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
