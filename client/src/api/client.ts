
import axios, { type InternalAxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Let the browser set the multipart boundary for FormData uploads.
    if (config.data instanceof FormData) {
      config.headers.delete("Content-Type");
    }

    return config;
  }
);

export default apiClient;
