import { ApiResponse } from "@/types";
import { ApiRoutes } from "./apiRoutes";
import { axiosInstance } from "./axiosInstance";

type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  userId: number;
  userName: string;
  fullName: string;
  email: string;
  isActivated: boolean;
  createdAt: string;
};

export const register = async () => {
  return (
    await axiosInstance.post<ApiResponse<AuthResponse>>(ApiRoutes.auth.register)
  ).data;
};

export const login = async () => {
  return (
    await axiosInstance.post<ApiResponse<AuthResponse>>(ApiRoutes.auth.login)
  ).data;
};

export const logout = async () => {
  return (await axiosInstance.post<ApiResponse<null>>(ApiRoutes.auth.logout))
    .data;
};

export const refresh = async () => {
  return (
    await axiosInstance.get<ApiResponse<AuthResponse>>(ApiRoutes.auth.logout)
  ).data;
};
