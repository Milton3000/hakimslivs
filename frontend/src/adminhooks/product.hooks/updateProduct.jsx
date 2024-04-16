import React from 'react'
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

function useUpdateProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (product) => {
            console.log('product:', product);
            const response = await fetch(`https://hakimslivs-backend.onrender.com/api/products/update/${product._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (!response.ok) {
                throw new Error('Failed to update product');
            }

            return response.json();
        },
        //client side optimistic update
        onMutate: (newProductInfo) => {
          queryClient.setQueryData(['products'], (prevProducts) => {
              return prevProducts?.map((prevProduct) =>
                  prevProduct._id === newProductInfo._id ? newProductInfo : prevProduct,
              );
          });
      },
         onSettled: () => queryClient.invalidateQueries({ queryKey: ['products'] }), //refetch products after mutation
    });
}

export { useUpdateProduct }