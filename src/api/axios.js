import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // URL del backend
});

// Interceptor para incluir el token en cada solicitud
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-access-token'] = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
