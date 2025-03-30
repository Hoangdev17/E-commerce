// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientLayout from './layouts/ClientLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import Cart from './components/Cart';
import SuccessPage from './components/SuccessPage';
import CancelPage from './components/CancelPage';
import ShippingForm from './components/ShippingForm';
import ProfilePage from './pages/ProfilePage';

import AdminDashboard from './pages/AdminDashboard';
import AdminUserPage from './pages/AdminUserPage';
import ProductManager from './pages/ProductManager';
import OrderManager from './pages/OrderManager';

function App() {
  return (
    <Router>
      <Routes>
        {/* Client Layout */}
        <Route element={<ClientLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
          <Route path="/shipping-info" element={<ShippingForm />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path='users' element={<AdminUserPage />} />
          <Route path='products' element={<ProductManager />} />
          <Route path='orders' element={<OrderManager />} />                  
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
