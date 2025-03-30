import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import axios from 'axios';
import ProductForm from '../components/ProductForm';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formVisible, setFormVisible] = useState(false);

  // Fetch danh sách sản phẩm
  const fetchProducts = async () => {
    const res = await axios.get('https://e-commerce-1-6nku.onrender.com/api/products');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    await axios.delete(`https://e-commerce-1-6nku.onrender.com/api/products/${id}`, config);
    message.success('Đã xóa sản phẩm');
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormVisible(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setFormVisible(true);
  };

  const handleFormSuccess = () => {
    setFormVisible(false);
    fetchProducts();
  };

  const columns = [
    { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name' },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <img
          src={image}
          alt="product"
          style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }}
        />
      ),
    },
    { title: 'Mô tả', dataIndex: 'description', key: 'description' },
    { title: 'Giá', dataIndex: 'price', key: 'price' },
    { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Danh mục', dataIndex: 'category', key: 'category' },
    { title: 'Đánh giá TB', dataIndex: 'averageRating', key: 'averageRating' },
    { title: 'Số lượt đánh giá', dataIndex: 'numReviews', key: 'numReviews' },
    {
      title: 'Hành động',
      render: (_, record) => (
        <>
          <Button onClick={() => handleEdit(record)} type="link">Sửa</Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger type="link">Xóa</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Quản lý sản phẩm</h2>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Thêm sản phẩm
      </Button>

      <Table columns={columns} dataSource={products} rowKey="_id" />

      <ProductForm
        visible={formVisible}
        onClose={() => setFormVisible(false)}
        onSuccess={handleFormSuccess}
        product={editingProduct}
      />
    </div>
  );
};

export default ProductManager;
