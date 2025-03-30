import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, InputNumber, Button, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;
const categoryOptions = ['Electronics', 'Clothing', 'Beauty', 'Home', 'Sports', 'Apple'];

const ProductForm = ({ visible, onClose, onSuccess, product }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
      setImageUrl(product.image || '');
    } else {
      form.resetFields();
      setImageUrl('');
    }
  }, [product, form]);

  const handleUpload = async (options) => {
    const { file, onSuccess, onError } = options;
    const formData = new FormData();
    formData.append('avatar', file);
  
    const token = localStorage.getItem('token');
  
    try {
      const res = await axios.post(
        `https://e-commerce-1-6nku.onrender.com/api/products/upload/${product._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}` // 👈 truyền token vào đây
          }
        }
      );
      setImageUrl(res.data.image); 
      message.success('Ảnh đã được tải lên!');
      onSuccess("OK"); 
    } catch (error) {
      console.error(error);
      message.error('Lỗi khi tải ảnh lên');
      onError(error);
    }
  };
  

  const onFinish = async (values) => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const productData = { ...values, image: imageUrl };

    if (product) {
      await axios.put(`https://e-commerce-1-6nku.onrender.com/api/products/${product._id}`, productData, config);
      message.success('Sửa sản phẩm thành công!');
    } else {
      await axios.post('https://e-commerce-1-6nku.onrender.com/api/products/add', productData, config);
      message.success('Thêm sản phẩm thành công!');
    }

    onSuccess();
  };

  return (
    <Modal
      open={visible}
      title={product ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Mô tả" rules={[{ required: true }]}>
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="quantity" label="Số lượng" rules={[{ required: true }]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="category" label="Danh mục" rules={[{ required: true }]}>
          <Select placeholder="Chọn danh mục">
            {categoryOptions.map((cat) => (
              <Option key={cat} value={cat}>
                {cat}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Ảnh sản phẩm">
          <Upload
            customRequest={handleUpload}
            showUploadList={false}
            accept="image/*"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt="product" 
              style={{ width: '100%', marginTop: 10, borderRadius: 8 }} 
            />
          )}
        </Form.Item>


        <Form.Item>
          <Button type="primary" htmlType="submit">
            {product ? 'Lưu thay đổi' : 'Thêm'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductForm;
