import axios from 'axios';

// using VITE_API_URL in production, fallback to '/api' for vite proxy in local dev
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

