import { LocalStorage } from "@/config";
import axios from "axios";

const baseURL = import.meta.env.VITE_PUBLIC_API_URL;

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(LocalStorage.token)}`;

  return config;
});
