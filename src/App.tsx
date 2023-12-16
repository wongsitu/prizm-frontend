// src/App.js
import { QueryClientProvider } from 'react-query';
import './index.css'; // Import Tailwind CSS
import Dashboard from './pages/Dashboard/Dahsboard';
import { queryClient } from './services/api';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
};

export default App;
