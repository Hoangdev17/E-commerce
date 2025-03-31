import React from 'react';
import { Card, Button, Rate, Typography, message, notification } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/actions/cartActions';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/reset.css';

const { Title, Text } = Typography;

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (event) => {
    event.stopPropagation(); 
  
    const token = localStorage.getItem("token");
    if (!token || token === "null" || token === "undefined") {
      
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      message.warning("Bạn cần đăng nhập để mua hàng!");
      return navigate('/login');
    }
  
    dispatch(addToCart(product._id, 1));
  
    notification.success({
      message: 'Thành công!',
      description: 'Sản phẩm đã được thêm vào giỏ hàng.',
      placement: 'bottomRight',
      duration: 5
    });
  
    
  };

  return (
    <Card
      hoverable
      style={{
        borderRadius: 10,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
      cover={
        <div style={{ textAlign: 'center', background: '#f5f5f5', padding: 10 }}>
          <img 
            alt={product.name} 
            src={product.image} 
            style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 10 }}
          />
        </div>
      }
    >
      <Title level={4} style={{ marginBottom: 5 }}>{product.name}</Title>
      <Rate disabled defaultValue={product.averageRating || 0} style={{ fontSize: 14 }} />
      <Text strong style={{ display: 'block', margin: '8px 0', color: '#ff4d4f', fontSize: 16 }}>
        ${product.price}
      </Text>
      <Button
        type="primary"
        icon={<ShoppingCartOutlined />}
        block
        style={{ borderRadius: 5 }}
        onClick={(e) => handleAddToCart(e)}
      >
        Thêm vào giỏ
      </Button>
    </Card>
  );
};

export default ProductCard;
