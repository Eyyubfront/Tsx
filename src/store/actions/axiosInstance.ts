import axios from "axios";
import { logout } from "../slice/authSlice";
import store from "../index";

const axiosInstance = axios.create({
  baseURL: "https://learn-language-app.azurewebsites.net/api",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;


    if (error.response?.status === 401) {

      if (originalRequest._retry) {

       
        store.dispatch(logout());
        return Promise.reject(error);
      }


      originalRequest._retry = true;

      
      
      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const response = await axiosInstance.post(
          "/RefreshToken",
          { refreshToken },
          {
            headers: { "Content-Type": "application/json" },

          }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data.data;



        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
    
        return axiosInstance(originalRequest);
      } catch (err) {
        store.dispatch(logout());

        return Promise.reject(err);
      }
    }

    throw error;
  }
);


export default axiosInstance;