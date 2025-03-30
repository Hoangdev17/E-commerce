import React from 'react';
import { Card, Button, Rate } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/actions/cartActions';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCard = () => {
    dispatch(addToCart(product._id, 1));
    navigate("/cart");
  };

  return (
    <Card
      hoverable
      cover={<img alt={product.name} src={product.image} />}
      style={{ height: '100%' }}
    >
      <Rate disabled defaultValue={product.averageRating || 0} />
      <Card.Meta title={product.name} description={`Giá: $${product.price}`} />
      <Button
        type="primary"
        icon={<ShoppingCartOutlined />}
        style={{ marginTop: 10, width: '100%' }}
        onClick={handleAddToCard}
      >
        Thêm vào giỏ
      </Button>
    </Card>
  );
};

export default ProductCard;
