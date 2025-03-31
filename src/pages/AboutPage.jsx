import React from 'react';
import { Typography, Card, Row, Col, Avatar } from 'antd';
import { ShopOutlined, CustomerServiceOutlined, SolutionOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const AboutPage = () => {
  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 20 }}>
      <Card bordered={false} style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: 8, padding: 24 }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 20 }}>About Our Company</Title>
        <Paragraph style={{ fontSize: 16, textAlign: 'center' }}>
          Welcome to our store! We are committed to providing high-quality products and exceptional customer service.
        </Paragraph>

        <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
          <Col xs={24} md={8}>
            <Card bordered={false} style={{ textAlign: 'center', padding: 20 }}>
              <Avatar size={64} icon={<ShopOutlined />} style={{ backgroundColor: '#1890ff', marginBottom: 10 }} />
              <Title level={4}>Our Mission</Title>
              <Paragraph>
                Our mission is to bring the best products to our customers with top-tier service and convenience.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card bordered={false} style={{ textAlign: 'center', padding: 20 }}>
              <Avatar size={64} icon={<CustomerServiceOutlined />} style={{ backgroundColor: '#fa8c16', marginBottom: 10 }} />
              <Title level={4}>Customer Support</Title>
              <Paragraph>
                Our support team is always ready to assist you with any inquiries. Contact us anytime!
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card bordered={false} style={{ textAlign: 'center', padding: 20 }}>
              <Avatar size={64} icon={<SolutionOutlined />} style={{ backgroundColor: '#52c41a', marginBottom: 10 }} />
              <Title level={4}>Quality Guarantee</Title>
              <Paragraph>
                We stand behind our products and ensure their quality. Satisfaction is our priority.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default AboutPage;
