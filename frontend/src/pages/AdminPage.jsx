import React from 'react'
import AdminTable from '../components/productsAdminTable'
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query';


const adminPage = () => {
  return (
    <div>
        <QueryClientProvider client={new QueryClient()}>
            <AdminTable />
        </QueryClientProvider>
    </div>
  )
}

export default adminPage