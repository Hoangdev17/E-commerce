// src/components/Footer.js
import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      © {new Date().getFullYear()} My Shop. All rights reserved.
    </Footer>
  );
};

export default AppFooter;
