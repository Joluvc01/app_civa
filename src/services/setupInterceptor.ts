import axios from 'axios';
import authService from './AuthService';

const setupInterceptors = () => {
  axios.interceptors.request.use(
    config => {
      const token = authService.getToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
};

export default setupInterceptors;