import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  List, Button, InputNumber, Empty, Typography,
  Divider, Image, Radio, Row, Col, Card
} from 'antd';
import { removeFromCart, updateCartItem } from '../store/actions/cartActions';
import CheckoutButton from './CheckoutButton';

const { Title, Text } = Typography;

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const [paymentMethod, setPaymentMethod] = useState('stripe');

  useEffect(() => {
    dispatch({ type: 'FETCH_CART' });
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCartItem(productId, quantity));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getProductNames = () => {
    return cartItems.map(item => item.name).join(", ");
  };

  if (cartItems.length === 0) {
    return <Empty description="Giỏ hàng của bạn đang trống" style={{ marginTop: '50px' }} />;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>🛒 Giỏ Hàng</Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={16}>
          <List
            itemLayout="vertical"
            dataSource={cartItems}
            renderItem={item => (
              <Card
                key={item.productId}
                style={{ marginBottom: 20 }}
                bordered
              >
                <Row gutter={[16, 16]} align="middle">
                  <Col xs={24} sm={8}>
                    <Image
                      width="100%"
                      height={150}
                      src={item.image || '/default-image.jpg'}
                      alt={item.name}
                      style={{ objectFit: 'cover', borderRadius: '8px' }}
                      preview={false}
                    />
                  </Col>
                  <Col xs={24} sm={16}>
                    <Title level={4}>{item.name}</Title>
                    <Text>Giá: {item.price.toLocaleString()} VNĐ</Text><br />
                    <Text strong>
                      Tổng: {(item.price * item.quantity).toLocaleString()} VNĐ
                    </Text><br /><br />

                    <Row align="middle" gutter={12}>
                      <Col>
                        <Text>Số lượng:</Text>
                      </Col>
                      <Col>
                        <InputNumber
                          min={1}
                          value={item.quantity}
                          onChange={(value) => handleUpdateQuantity(item.productId, value)}
                        />
                      </Col>
                      <Col>
                        <Button danger onClick={() => handleRemove(item.productId)}>Xóa</Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            )}
          />
        </Col>

        <Col xs={24} md={8}>
          <Card
            title="Thanh toán"
            bordered
            style={{ position: 'sticky', top: 20 }}
          >
            <Title level={4}>Tổng: {calculateTotal().toLocaleString()} VNĐ</Title>

            <Divider />

            <Text strong>Phương thức thanh toán:</Text>
            <Radio.Group
              style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <Radio value="stripe">💳 Stripe</Radio>
              <Radio value="momo">📱 MoMo</Radio>
              <Radio value="COD">🚚 Thanh toán khi nhận hàng (COD)</Radio>
            </Radio.Group>

            <Divider />

            <CheckoutButton
              amount={calculateTotal()}
              name={getProductNames()}
              method={paymentMethod}
              items={cartItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
              }))}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
