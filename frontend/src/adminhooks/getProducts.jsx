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
        queryKey: ['users'],
        queryFn: async () => {
            const response = await fetch('https://hakimslivs-backend.onrender.com/api/products/all');

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            return response.json();
        },
        refetchOnWindowFocus: true,
    });
}

export { useGetProducts }