import React from 'react'
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

function useDeleteProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (product) => {
            console.log('product:', product);
            const response = await fetch(`https://hakimslivs-backend.onrender.com/api/products/delete/${product._id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete product');
            }

            return response.json();
        },
        //client side optimistic update
        onMutate: (productId) => {
            queryClient.setQueryData(['products'], (prevProducts) =>
            prevProducts?.filter((product) => product.id !== productId),
            );
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['products'] }), //refetch products after mutation
    });
}

export { useDeleteProduct }