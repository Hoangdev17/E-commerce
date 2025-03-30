import React from 'react';
import { Layout, Row, Col, Card, Typography, Button, Carousel } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import slide1 from '../assets/images/slide1.jpg';
import slide2 from '../assets/images/slide2.jpg';
import slide3 from '../assets/images/slide3.jpg';
import slide4 from '../assets/images/slide4.jpg';


const {  Content} = Layout;
const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <Layout>
      

      <Content style={{ padding: '20px 50px' }}>
        {/* Banner Carousel */}
        <Carousel autoplay style={{ marginBottom: '2rem' }}>
          <div>
            <img src={slide1} alt="banner" style={{ width: '100%', borderRadius: 8 }} />
          </div>
          <div>
            <img src={slide2} alt="banner2" style={{ width: '100%', borderRadius: 8 }} />
          </div>
          <div>
            <img src={slide3} alt="banner3" style={{ width: '100%', borderRadius: 8 }} />
          </div>
          <div>
            <img src={slide4} alt="banner4" style={{ width: '100%', borderRadius: 8 }} />
          </div>
        </Carousel>

        {/* Intro Text */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Title level={2}>Chào mừng bạn đến với My Shop!</Title>
          <Paragraph>Khám phá hàng ngàn sản phẩm chất lượng với giá tốt nhất!</Paragraph>
        </div>

        {/* Product Cards Demo */}
        <Row gutter={[16, 16]}>
          {[1, 2, 3, 4].map((item) => (
            <Col key={item} xs={24} sm={12} md={6}>
              <Card
                hoverable
                cover={<img alt="product" src="https://via.placeholder.com/300x200" />}
              >
                <Card.Meta title={`Sản phẩm ${item}`} description="Giá: $100" />
                <Button type="primary" icon={<ShoppingCartOutlined />} style={{ marginTop: '10px', width: '100%' }}>
                  Thêm vào giỏ
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>

      
    </Layout>
  );
};

export default Home;
