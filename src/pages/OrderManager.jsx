import React, { useEffect, useState } from 'react';
import { Table, Select, message, Typography } from 'antd';
import axios from 'axios';
import '../OrderManager.css';

const { Option } = Select;
const { Title } = Typography;

const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://e-commerce-1-6nku.onrender.com/api/order', config);
      setOrders(res.data);
    } catch (err) {
      message.error('Lỗi khi tải đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `https://e-commerce-1-6nku.onrender.com/api/order/${orderId}/status`,
        { status: newStatus },
        config
      );
      message.success('Cập nhật trạng thái thành công');
      fetchOrders();
    } catch (err) {
      message.error('Lỗi khi cập nhật trạng thái');
    }
  };

  const columns = [
    {
      title: 'Người đặt',
      dataIndex: 'userId',
      key: 'userId',
      render: (user) =>
        user ? `${user.name} (${user.email})` : 'Khách vãng lai',
      width: 200,
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'items',
      key: 'items',
      render: (items) => (
        <ul className="product-list">
          {items.map((item, index) => (
            <li key={index}>
              {item.productName} x {item.quantity} -{' '}
              {(item.price * item.quantity).toLocaleString()}₫
            </li>
          ))}
        </ul>
      ),
      width: 300,
    },
    {
      title: 'Địa chỉ giao hàng',
      dataIndex: 'shippingAddress',
      key: 'shippingAddress',
      render: (address) =>
        address ? (
          <>
            <div><strong>{address.fullName}</strong></div>
            <div>SĐT: {address.phone}</div>
            <div>{address.address}</div>
          </>
        ) : (
          'Không có'
        ),
      width: 250,
    },
    {
      title: 'Thanh toán',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (method) => method || 'Không rõ',
      width: 130,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price) => `${price.toLocaleString()}₫`,
      width: 130,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(record._id, value)}
          style={{ width: 160 }}
        >
          <Option value="Chờ xác nhận">Chờ xác nhận</Option>
          <Option value="Đang vận chuyển">Đang vận chuyển</Option>
          <Option value="Đã giao">Đã giao</Option>
          <Option value="Đã hủy">Đã hủy</Option>
        </Select>
      ),
      width: 180,
    },
  ];

  return (
    <div className="order-container">
      <Title level={3} className="order-title">Quản lý đơn hàng</Title>
      <div className="order-table-wrapper">
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 6 }}
          scroll={{ x: 1000 }}
        />
      </div>
    </div>
  );
};

export default OrderManager;
