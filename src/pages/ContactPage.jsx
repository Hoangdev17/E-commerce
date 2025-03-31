import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, message  } from "antd";
import { PhoneOutlined, MailOutlined, HomeOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const ContactPage = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("https://e-commerce-1-6nku.onrender.com/api/contact/send-contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (data.success) {
        message.success("Your message has been sent successfully!");
      } else {
        message.error("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending contact form:", error);
      message.error("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
      <Card bordered={false} style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)", borderRadius: 8, padding: 24 }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 20 }}>Contact Us</Title>
        
        <Paragraph style={{ textAlign: "center" }}>
          Have questions or need assistance? Reach out to us, and we'll be happy to help!
        </Paragraph>
        
        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 20 }}>
          <div style={{ textAlign: "center" }}>
            <PhoneOutlined style={{ fontSize: 24, color: "#1890ff" }} />
            <Paragraph><strong>Phone:</strong> +84 086 660 9196</Paragraph>
          </div>
          <div style={{ textAlign: "center" }}>
            <MailOutlined style={{ fontSize: 24, color: "#fa8c16" }} />
            <Paragraph><strong>Email:</strong> hoangluudev17@company.com</Paragraph>
          </div>
          <div style={{ textAlign: "center" }}>
            <HomeOutlined style={{ fontSize: 24, color: "#52c41a" }} />
            <Paragraph><strong>Address:</strong> 48 Street, Thu Duc City, Ho Chi Minh City</Paragraph>
          </div>
        </div>
        
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="Your Name" rules={[{ required: true, message: "Please enter your name!" }]}> 
            <Input placeholder="Enter your name" />
          </Form.Item>
          
          <Form.Item name="email" label="Your Email" rules={[{ required: true, type: "email", message: "Please enter a valid email!" }]}> 
            <Input placeholder="Enter your email" />
          </Form.Item>
          
          <Form.Item name="message" label="Your Message" rules={[{ required: true, message: "Please enter your message!" }]}> 
            <Input.TextArea rows={4} placeholder="Write your message here" />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </Form.Item>
        </Form>

        <div style={{ marginTop: 20, textAlign: "center" }}>
          <Title level={4}>Our Location</Title>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.758679967541!2d106.76938307483796!3d10.829017958462327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317526c7b42d7aef%3A0x42aaf5b5e3b1b88d!2zVGjhu6cgROG7mWMsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1sen!2s!4v1711865481234!5m2!1sen!2s"
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: 8 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </Card>
    </div>
  );
};

export default ContactPage;
