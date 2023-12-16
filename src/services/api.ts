import axios from 'axios';
import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount : false,
    },
  },
})

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default API;
