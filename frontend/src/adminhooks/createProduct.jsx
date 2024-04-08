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
        mutationFn: async (user) => {
            const response = await fetch('http://localhost:5000/api/firm/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error('Failed to create user');
            }

            return response.json();
        },
        //client side optimistic update
        onMutate: (newUserInfo) => {
            queryClient.setQueryData(['users'], (prevUsers) => [
                ...prevUsers,
                {
                    ...newUserInfo,
                  
                },
            ]);
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}
export { useCreateProduct }