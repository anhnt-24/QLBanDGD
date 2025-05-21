import { refresh } from "@/apis/account.api";
import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  timeout: 5000,
});

export const ngrok = axios.create({
  baseURL: "https://f5780dc0ffd0836fcdd6c3c752d96c98.serveo.net",
  timeout: 5000,
  headers: {
    "bypass-tunnel-reminder": "true",
  },
});

export const instance = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  withCredentials: true,
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await refresh();
        const token = response?.data?.data?.token;
        if (token) {
          localStorage.setItem("token", token);
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        return axios(originalRequest);
      } catch (error) {}
    }

    return Promise.reject(error);
  },
);
