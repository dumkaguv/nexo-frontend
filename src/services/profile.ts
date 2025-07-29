import type { ApiResponse, Profile } from "@/types";
import { axiosInstance } from "./axiosInstance";
import { ApiRoutes } from "./apiRoutes";

export const getProfile = async () => {
  return (await axiosInstance.get<ApiResponse<Profile>>(ApiRoutes.profile.base))
    .data;
};
