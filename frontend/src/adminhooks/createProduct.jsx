import React from 'react'
import {
    QueryClient,
    QueryClientProvider,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';

function useCreateProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (product) => {
            const response = await fetch('https://hakimslivs-backend.onrender.com/api/products/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (!response.ok) {
                throw new Error('Failed to create product');
            }

            return response.json();
        },
        //client side optimistic update
        onMutate: (newProductInfo) => {
            queryClient.setQueryData(['products'], (prevProducts) => [
                ...prevProducts,
                {
                    ...newProductInfo,
                  
                },
            ]);
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['products'] }), //refetch users after mutation, disabled for demo
    });
}
export { useCreateProduct }