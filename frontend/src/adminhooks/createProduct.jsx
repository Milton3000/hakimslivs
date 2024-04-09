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
            try {
                const response = await fetch('https://hakimslivs-backend.onrender.com/api/products/new', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                });
        
                if (!response.ok) {
                    console.log('Failed to create product');
                    const errorResponse = await response.json();
                    console.log('Error response from server:', errorResponse);
                    
                    // Check if the error response contains validation errors
                    if (errorResponse.message && errorResponse.message.startsWith('Validation error')) {
                        const validationErrors = JSON.stringify(errorResponse.errors).replace(/,/g, ',\n');
                        alert('Validation error: \n' + validationErrors + '\n');
                    } else {
                        alert(errorResponse.message || 'Failed to create product');
                    }
                    
                    return;
                }
        
                return response.json();
            } catch (error) {
                console.error('Error creating product:', error);
                alert('An unexpected error occurred. Please try again later.');
            }
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