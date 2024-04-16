import React, { useState } from 'react';
import AdminProducts from '../components/productsAdminTable';
import AdminOrders from '../components/ordersAdminTable';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import '../styles/adminPage.css';
import profilepic from '../styles/profile-circle.svg';

const AdminPage = () => {
  const [activePanel, setActivePanel] = useState('products');

  const handlePanelChange = (panel) => {
    setActivePanel(panel);
  };

  return (
    <div style={{ display: 'flex', height: '50rem' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className='admin-menu'>
          <div style={{ width: '141px' }} className='user-box'>
            <img style={{ height: '75px', width: '75px' }} src={profilepic} alt="Profile" />
            <b>Användare</b>
          </div>
          <ul className='admin-ul'>
            <li className='admin-list-item' onClick={() => handlePanelChange('products')}>Produkthantering</li>
            <li className='admin-list-item' onClick={() => handlePanelChange('orders')}>Orderhantering</li>
            <li className='admin-list-item'>(tom)</li>
            <li className='admin-list-item'>(tom)</li>
            <li className='admin-list-item'>(tom)</li>
          </ul>
        </div>
      </div>
      <div style={{ width: '80%', padding: '20px' }}>
        <QueryClientProvider client={new QueryClient()}>
          {activePanel === 'products' && <AdminProducts />}
          {activePanel === 'orders' && <AdminOrders />}
        </QueryClientProvider>
      </div>
    </div>
  );
};

export default AdminPage;
