import React, { useState } from 'react';
import AdminProducts from '../components/productsAdminTable';
import AdminOrders from '../components/ordersAdminTable';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import '../styles/adminPage.css';
import profilepic from '../styles/profile-circle.svg';
import 'iconify-icon';

const AdminPage = () => {
  const [activePanel, setActivePanel] = useState('products');

  const handlePanelChange = (panel) => {
    setActivePanel(panel);
  };

  return (
    <div style={{ display: 'flex', height: '50rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '15px', paddingTop: '20px', paddingBottom: '20px' }}>
        <div className='admin-menu'>
          <div className='user-box'>
            <img style={{ height: '75px', width: '75px' }} src={profilepic} alt="Profile" />
            <b>Användare</b>
          </div>
          <ul className='admin-ul'>
            <li className='admin-list-item' onClick={() => handlePanelChange('products')}>
            <iconify-icon icon="dashicons:edit" width="24" height="24"  style={{color: '#3184dd'}} />
              Produkthantering
              </li>
            <li className='admin-list-item' onClick={() => handlePanelChange('orders')}>
            <iconify-icon icon="dashicons:list-view" width="24" height="24"  style={{color: '#3184dd'}} />
              Orderhantering
              </li>
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
