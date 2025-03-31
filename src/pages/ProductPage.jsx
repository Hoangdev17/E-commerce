import React, { useState, useEffect } from 'react';
import { Input, Select, Row, Col, Typography, Modal, Rate, Button, List, Form, Divider } from 'antd';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const { Title } = Typography;
const { Option } = Select;

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://e-commerce-1-6nku.onrender.com/api/products', {
        params: { name, category },
      });
      setProducts(res.data);
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm:', error);
    }
  };

  const fetchReviews = async (productId) => {
    try {
      const res = await axios.get(`https://e-commerce-1-6nku.onrender.com/api/products/${productId}/getreviews`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("Reviews nhận từ backend:", res.data.reviews); 
      setReviews(res.data.reviews || []); 
      setAverageRating(res.data.averageRating || 0);
    } catch (error) {
      console.error('Lỗi khi lấy reviews:', error);
    }
  };

  const handleOpenReviewModal = async (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    await fetchReviews(product._id);
  };

  const handleSubmitReview = async () => {
    if (!selectedProduct) return;
    try {
      await axios.post(`https://e-commerce-1-6nku.onrender.com/api/products/${selectedProduct._id}/reviews`, newReview, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewReview({ rating: 5, comment: '' });
      await fetchReviews(selectedProduct._id);
    } catch (error) {
      console.error('Lỗi khi gửi review:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [name, category]);

  return (
    <div style={{ padding: '20px 50px' }}>
      <Title level={2}>Sản phẩm</Title>

      {/* Bộ lọc */}
      <Row gutter={[16, 16]} style={{ marginBottom: '1rem' }}>
        <Col xs={24} sm={12} md={8}>
          <Input
            placeholder="Tìm kiếm theo tên..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Select
            placeholder="Chọn danh mục"
            value={category}
            onChange={(value) => setCategory(value)}
            style={{ width: '100%' }}
            allowClear
          >
            <Option value="Electronics">Electronics</Option>
            <Option value="Clothing">Clothing</Option>
            <Option value="Home">Home</Option>
            <Option value="Apple">Apple</Option>
          </Select>
        </Col>
      </Row>

      {/* Danh sách sản phẩm */}
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col key={product._id} xs={24} sm={12} md={6}>
            <div onClick={() => handleOpenReviewModal(product)} style={{ cursor: 'pointer' }}>
              <ProductCard product={product} />
            </div>
          </Col>
        ))}
      </Row>

      {/* Modal hiển thị đánh giá */}
      <Modal
        title={`Đánh giá sản phẩm: ${selectedProduct?.name}`}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={700}
      >
         {/* 🟢 Chi tiết sản phẩm */}
          {selectedProduct && (
            <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: 8 }}
              />
              <div>
                <Title level={4}>{selectedProduct.name}</Title>
                <p><strong>Giá:</strong> ${selectedProduct.price}</p>
                <p><strong>Danh mục:</strong> {selectedProduct.category}</p>
                <p><strong>Mô tả:</strong> {selectedProduct.description}</p>
              </div>
            </div>
          )}

        {/* Hiển thị điểm trung bình */}
        <div style={{ marginBottom: 15 }}>
          <strong>Đánh giá trung bình:</strong>{' '}
          <Rate disabled value={parseFloat(averageRating.toFixed(1))} />
          <span style={{ marginLeft: 8 }}>({averageRating.toFixed(1)} sao)</span>
        </div>

        <Divider />

        {/* Danh sách đánh giá */}
        <List
          header={<strong>Đánh giá từ người dùng</strong>}
          dataSource={reviews}
          locale={{ emptyText: 'Chưa có đánh giá nào' }}
          renderItem={(item) => (
            <List.Item>
              <div>
              <strong>{item?.name}</strong>
                <Rate disabled defaultValue={item.rating} />
                <p style={{ marginTop: 4 }}>{item.comment}</p>
              </div>
            </List.Item>
          )}
        />

        {/* Form đánh giá mới */}
        <Form layout="vertical" style={{ marginTop: 20 }} onFinish={handleSubmitReview}>
          <Form.Item label="Đánh giá sao">
            <Rate
              value={newReview.rating}
              onChange={(value) => setNewReview({ ...newReview, rating: value })}
            />
          </Form.Item>
          <Form.Item label="Bình luận">
            <Input.TextArea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              rows={3}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">Gửi đánh giá</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductPage;
