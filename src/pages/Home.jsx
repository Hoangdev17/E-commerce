import React from 'react';
import { Layout, Row, Col, Typography, Button, Carousel } from 'antd';
import { Link } from 'react-router-dom';
import slide1 from '../assets/images/slide1.jpg';
import slide2 from '../assets/images/slide2.jpg';
import slide3 from '../assets/images/slide3.jpg';
import slide4 from '../assets/images/slide4.jpg';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <Layout>
      <Content style={{ padding: '20px 50px', textAlign: 'center' }}>
        {/* Banner Carousel */}
        <Carousel autoplay effect="fade" style={{ marginBottom: '2rem' }}>
          {[slide1, slide2, slide3, slide4].map((slide, index) => (
            <div key={index}>
              <img src={slide} alt={`banner-${index}`} style={{ width: '100%', borderRadius: 8 }} />
            </div>
          ))}
        </Carousel>

        {/* Intro Section */}
        <div style={{ marginBottom: '3rem' }}>
          <Title level={2}>Chào mừng bạn đến với My Shop!</Title>
          <Paragraph style={{ fontSize: '16px', color: '#555' }}>
            Khám phá hàng ngàn sản phẩm chất lượng với giá tốt nhất!
          </Paragraph>
        </div>

        {/* Navigation Section */}
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} sm={12} md={8}>
            <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: 8 }}>
              <Title level={4}>Về chúng tôi</Title>
              <Paragraph>Hãy tìm hiểu về sứ mệnh và giá trị của My Shop.</Paragraph>
              <Link to="/about">
                <Button type="primary" size="large">Tìm hiểu ngay</Button>
              </Link>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: 8 }}>
              <Title level={4}>Sản phẩm của chúng tôi</Title>
              <Paragraph>Khám phá các sản phẩm mới nhất và chất lượng.</Paragraph>
              <Link to="/products">
                <Button type="primary" size="large">Mua sắm ngay</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Home;
