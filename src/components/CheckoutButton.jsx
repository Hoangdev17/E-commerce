import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import { CreditCardOutlined, DollarCircleOutlined, MobileOutlined } from "@ant-design/icons";

const stripePromise = loadStripe("pk_test_51R74zk1csJvkHuz6c0RqDJRIXkSxsrhbmlpMS0u6iOj5Xa5LL56OIfyhxzGSNF0Q4xUvKOkoaton4SEkdOEBPpYQ00FDdJ5Io9");

const CheckoutButton = ({ amount, name, method, items }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const stripe = await stripePromise;
    const token = localStorage.getItem("token");

    try {
      let res;

      if (method === "stripe") {
        res = await fetch("https://e-commerce-1-6nku.onrender.com/api/cart/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount, name }),
        });

        const { sessionId } = await res.json();
        const result = await stripe.redirectToCheckout({ sessionId });

        if (result.error) {
          message.error(result.error.message);
        }

      } else if (method === "COD") {
        navigate("/shipping-info", {
          state: { amount, name, method, items }
        });

      } else if (method === "momo") {
        res = await fetch("https://e-commerce-1-6nku.onrender.com/cart/momo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount, name }),
        });

        const data = await res.json();
        if (data.payUrl) {
          window.location.href = data.payUrl;
        } else {
          message.error("Không tạo được đơn hàng MoMo.");
        }
      }

    } catch (err) {
      console.error(err);
      message.error("Lỗi khi thanh toán. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Icon theo phương thức thanh toán
  const getIcon = () => {
    if (method === "stripe") return <CreditCardOutlined />;
    if (method === "momo") return <MobileOutlined />;
    if (method === "COD") return <DollarCircleOutlined />;
    return null;
  };

  // Nhãn theo phương thức
  const getLabel = () => {
    if (method === "stripe") return "Thanh toán bằng Stripe";
    if (method === "momo") return "Thanh toán qua MoMo";
    if (method === "COD") return "Thanh toán khi nhận hàng";
    return "Thanh toán";
  };

  return (
    <Button
      type="primary"
      size="large"
      icon={getIcon()}
      loading={loading}
      block
      onClick={handleClick}
      style={{ marginTop: '20px' }}
    >
      {getLabel()} ({amount.toLocaleString()} VNĐ)
    </Button>
  );
};

export default CheckoutButton;
