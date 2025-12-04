import axios from "axios";
import { ACCESS_TOKEN_STORAGE_NAME } from "../shared/constants/storage.ts";

const baseUrl = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN_STORAGE_NAME);

    if (token) {
      // в TS желательно проверять headers
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
export default apiClient;
