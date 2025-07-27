import type { ApiResponse, User } from "@/types";
import { axiosInstance } from "./axiosInstance";
import { ApiRoutes } from "./apiRoutes";

export const getUserByUserOrFullName = async (name: string) => {
  return (
    await axiosInstance.get<ApiResponse<User[]>>(ApiRoutes.users.base, {
      params: { name },
    })
  ).data;
};

export const getUserById = async (id: number) => {
  return (
    await axiosInstance.get<ApiResponse<User>>(`${ApiRoutes.users.base}/${id}`)
  ).data;
};
