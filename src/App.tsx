// src/App.js
import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css'; // Import Tailwind CSS
import Dashboard from './pages/Dashboard/Dahsboard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount : false,
    },
  },
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
};

export default App;
