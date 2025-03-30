import { Layout, Button, Avatar, Dropdown, Space } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, DownOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AdminHeader = ({user}) => {
  const userName = user?.name || user.user?.name; 

  const items = [
    {
      key: '1',
      label: <Link to="/profile">Hồ sơ</Link>,
    },
    {
      key: '2',
      label: <span>Đăng xuất</span>,
    },
  ];

  return (
    <Header
      style={{
        background: '#001529',
        padding: '0 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <h1 style={{ color: 'white', fontSize: '20px', margin: 0 }}>Admin Dashboard</h1>

      <Space>
        <Link to="/">
          <Button type="primary">Về trang người dùng</Button>
        </Link>

        <Dropdown menu={{ items }} trigger={['click']}>
          <Space style={{ cursor: 'pointer' }}>
          <Avatar
          src={user?.profilePicture || user.user?.profilePicture || 'https://i.pravatar.cc/150'}
          style={{ backgroundColor: '#87d068' }}
          icon={!user?.profilePicture && !user.user?.profilePicture ? <UserOutlined /> : null}
        />
            <span style={{ color: 'white' }}>{userName}</span>
            <DownOutlined style={{ color: 'white' }} />
          </Space>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default AdminHeader;
