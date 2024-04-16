import React, { useState } from 'react';
import AdminProducts from '../components/productsAdminTable';
import AdminOrders from '../components/ordersAdminTable';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import '../styles/adminPage.css';

const AdminPage = () => {
  const [activePanel, setActivePanel] = useState('products');

  const handlePanelChange = (panel) => {
    setActivePanel(panel);
  };

  return (
    <div style={{ display: 'flex', height: '50rem' }}>
      <div style={{ display: 'flex', width: '11rem', paddingTop: '20px', paddingLeft: '15px', justifyContent: 'center', }}>
        <ul className='admin-ul'>
          <li className='admin-list-item' onClick={() => handlePanelChange('products')}>Produkthantering</li>
          <li className='admin-list-item' onClick={() => handlePanelChange('orders')}>Orderhantering</li>
        </ul>
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
