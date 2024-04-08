import React from 'react'

import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

function useGetProducts() {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await fetch('https://hakimslivs-backend.onrender.com/api/products/all');

            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            return response.json();
        },
        refetchOnWindowFocus: true,
    });
}

export { useGetProducts }