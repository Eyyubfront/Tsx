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

    // İlk 401 alındığında
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      let refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        // Refresh token yoxdursa istifadəçini çıxar
        store.dispatch(logout());
        return Promise.reject(error); // Geri dönmək üçün səhv göndər
      }

      try {
        const refreshResponse = await axiosInstance.post(
          "/RefreshToken",
          { refreshToken },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        const { accessToken, refreshToken: newRefreshToken } = refreshResponse.data.data;

        // Yeni token və refresh token-ləri saxla
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // Yeni tokeni hər iki yerdə təyin et
        axiosInstance.defaults.headers.common["Authorization"] =` Bearer ${accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        // Təkrarlanan sorğunu göndər
        const retryResponse = await axiosInstance(originalRequest);

        // 401 yenidən alınarsa, logout et
        if (retryResponse?.status === 401) {
          store.dispatch(logout());
        }

        return retryResponse; // Təkrarlanan cavabı geri qaytar
      } catch (err) {
        // Refresh token səhv olduqda istifadəçini çıxar
        store.dispatch(logout());
        return Promise.reject(err); // Geri dönmək üçün səhv göndər
      }
    }

    return Promise.reject(error); // Hər hansı digər səhvlər üçün
  }
);

export default axiosInstance;