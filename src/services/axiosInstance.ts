import axios from "axios";
import { getAccessToken, saveAccessToken } from "@/utils";
import { ApiRoutes } from "./apiRoutes";
import { ApiResponse } from "@/types";
import { AuthResponse } from "./auth";
import { Routes } from "@/config";

const baseURL = import.meta.env.VITE_PUBLIC_API_URL;

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.get<ApiResponse<AuthResponse>>(
          ApiRoutes.auth.refresh,
          {
            withCredentials: true,
          }
        );

        const newAccessToken = response.data.data?.accessToken;
        if (!newAccessToken) {
          window.location.href = Routes.login;
        }
        saveAccessToken(newAccessToken ?? "");

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
