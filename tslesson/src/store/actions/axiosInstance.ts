import axios from 'axios';
import { logout } from '../slice/authSlice';
import store from '../index';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: 'https://learn-language-api.azurewebsites.net/api',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;



    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        store.dispatch(logout()); 
        useNavigate()('/login');                                                                                                                                 
      }

      try {
        const response = await axiosInstance.post('/RefreshToken', { refreshToken });

        const { accessToken } = response.data;

        localStorage.setItem('token', accessToken); 
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        store.dispatch(logout()); 
        useNavigate()('/login'); 
      }
    }

    throw error;
  }
);

export default axiosInstance;
