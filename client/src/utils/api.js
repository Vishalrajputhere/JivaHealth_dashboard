import axios from 'axios';

// using vite proxy so we don't hardcode localhost:5000 everywhere
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
