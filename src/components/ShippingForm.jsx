import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, Card, message } from "antd";

const { Title } = Typography;

const ShippingForm = () => {
  const { state } = useLocation(); // amount, name, method, items
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("https://e-commerce-1-6nku.onrender.com/api/cart/cod", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: state.amount,
          items: state.items,
          shippingAddress: values,
          paymentMethod: state.method,
        }),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem("lastestOrder", JSON.stringify(data.order));
        navigate("/success");
      } else {
        message.error("Có lỗi xảy ra khi đặt hàng.");
      }
    } catch (err) {
      console.error(err);
      message.error("Lỗi kết nối đến máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: "0 16px" }}>
      <Card bordered>
        <Title level={3} style={{ textAlign: "center" }}>
          Nhập địa chỉ giao hàng
        </Title>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input placeholder="Nguyễn Văn A" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              { pattern: /^\d{9,11}$/, message: "Số điện thoại không hợp lệ" },
            ]}
          >
            <Input placeholder="0987654321" />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ giao hàng" }]}
          >
            <Input.TextArea rows={3} placeholder="Số nhà, đường, quận/huyện, tỉnh/thành" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              size="large"
            >
              Xác nhận đặt hàng
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ShippingForm;
