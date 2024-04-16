import React, { useState } from 'react';
import AdminProducts from '../components/productsAdminTable';
import AdminOrders from '../components/ordersAdminTable';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const AdminPage = () => {
  const [activePanel, setActivePanel] = useState('products');

  const handlePanelChange = (panel) => {
    setActivePanel(panel);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ height: '51rem', width: '10%', backgroundColor: '#f0f0f0', padding: '20px' }}>
        <ul>
          <li onClick={() => handlePanelChange('products')}>Products</li>
          <li onClick={() => handlePanelChange('orders')}>Orders</li>
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
