import axios from "axios";
import { logout } from "../slice/authSlice";
import store from "../index";

const axiosInstance = axios.create({
  baseURL: "https://learn-language-api.azurewebsites.net/api",
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

        localStorage.clear();
        store.dispatch(logout());
        return Promise.reject(error);
      }


      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {

        store.dispatch(logout());
        return Promise.reject(error);
      }

      try {

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

         if (error.response.status == 401 ){
          localStorage.clear();
          store.dispatch(logout());
        }
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {

       
        return Promise.reject(err);
      }
    }

    throw error;
  }
);


export default axiosInstance;









