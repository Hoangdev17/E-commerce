import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const CancelPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <CloseCircleOutlined style={{ fontSize: 80, color: 'red' }} />
      <Title level={2}>Thanh toán bị hủy</Title>
      <Paragraph>Bạn đã hủy quá trình thanh toán. Hãy thử lại nếu cần.</Paragraph>
    </div>
  );
};

export default CancelPage;
