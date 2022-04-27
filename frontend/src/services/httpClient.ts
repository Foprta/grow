import axios from "axios";
import authService from "./authService";

const httpClient = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });

httpClient.interceptors.request.use((config) => {
  if (config.headers && config.url?.startsWith("/api/secured/")) {
    config.headers.Authorization = `Bearer ${authService.getJWT()}`;
  }

  return config;
});

export default httpClient;
