import axios from "axios";
import { store } from "../redux/store";
const apiUrl = import.meta.env.VITE_APP_API;
const api = axios.create({baseURL:apiUrl});
// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Get the token from your storage
    const token = store.getState().user.token;
    // Exclude certain URLs from attaching the token
    const excludedUrls = ['/auth/login', '/auth/register']; // Add your excluded URLs
    if (token && !excludedUrls.some((url) => config.url.includes(url))) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;