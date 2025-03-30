import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic, message } from "antd";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://e-commerce-1-6nku.onrender.com/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStats(res.data);
    } catch (err) {
      message.error("Không thể tải dữ liệu dashboard");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 24 }}>📊 Thống kê tổng quan</h2>
      <Row gutter={16}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="👤 Người dùng"
              value={stats?.userCount || 0}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="📦 Sản phẩm"
              value={stats?.productCount || 0}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="🛒 Đơn hàng"
              value={stats?.orderCount || 0}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="💰 Doanh thu"
              value={(stats?.totalRevenue || 0).toLocaleString()}
              suffix="₫"
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
