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
import { useEffect } from 'react';

const AdminPage = ({ setCurrentRoute }) => {
  const [activePanel, setActivePanel] = useState('orders');

  const handlePanelChange = (panel) => {
    setActivePanel(panel);
  };

  useEffect(() => {
    setCurrentRoute('/admin');
  }, []);

  return (
    <div style={{ display: 'flex', height: '50rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '15px', paddingTop: '20px', paddingBottom: '20px' }}>
        <div className='admin-menu'>
          <div className='user-box'>
            <img style={{ height: '75px', width: '75px' }} src={profilepic} alt="Profile" />
            <b>Användare</b>
          </div>
          <ul className='admin-ul'>
            <li className='admin-list-item' onClick={() => handlePanelChange('orders')}>
              <iconify-icon icon="dashicons:list-view" width="24" height="24" style={{ color: '#3184dd' }} />
              Orderhantering
            </li>
            <li className='admin-list-item' onClick={() => handlePanelChange('products')}>
              <iconify-icon icon="dashicons:edit" width="24" height="24" style={{ color: '#3184dd' }} />
              Produkthantering
            </li>
          </ul>
        </div>
      </div>
      <div style={{ width: '90%', padding: '20px', height: '100%', boxSizing: 'border-box' }}>
        <div style={{ height: '100%', overflowY: 'scroll', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px', boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.2)' }}>
          <QueryClientProvider client={new QueryClient()}>
            {activePanel === 'orders' && <AdminOrders />}
            {activePanel === 'products' && <AdminProducts />}
          </QueryClientProvider>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
