import type { ApiResponse, User } from "@/types";
import { axiosInstance } from "./axiosInstance";
import { ApiRoutes } from "./apiRoutes";

export const getProfile = async () => {
  return (await axiosInstance.get<ApiResponse<User>>(ApiRoutes.profile.base))
    .data;
};
