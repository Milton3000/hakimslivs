import React from 'react'
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';


const validateRequired = (value) => !!value.length;
function validateUser(user) {
  
    return {
      firstName: !validateRequired(user.firstName)
        ? 'First Name is Required'
        : '',
    };
  }

export { validateUser }