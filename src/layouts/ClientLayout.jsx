// src/layouts/ClientLayout.jsx
import AppHeader from '../components/Header';
import AppFooter from '../components/Footer';
import { Outlet } from 'react-router-dom';

const ClientLayout = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
      <AppFooter />
    </>
  );
};

export default ClientLayout;
