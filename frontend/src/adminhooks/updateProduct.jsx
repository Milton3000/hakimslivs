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
        mutationFn: async (user) => {
            console.log('user:', user);
            const response = await fetch(`http://localhost:5000/api/firm/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            return response.json();
        },
        //client side optimistic update
        onMutate: (newUserInfo) => {
          queryClient.setQueryData(['users'], (prevUsers) => {
              return prevUsers?.map((prevUser) =>
                  prevUser._id === newUserInfo._id ? newUserInfo : prevUser,
              );
          });
      },
         onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}

export { useUpdateProduct }