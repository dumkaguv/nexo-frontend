import type { ApiResponse, Profile } from "@/types";
import { axiosInstance } from "./axiosInstance";
import { ApiRoutes } from "./apiRoutes";

export const getProfile = async () => {
  return (await axiosInstance.get<ApiResponse<Profile>>(ApiRoutes.profile.base))
    .data;
};

type UpdateProfilePayload = Partial<Profile>;

export const updateProfile = async (payload: UpdateProfilePayload) => {
  return (
    await axiosInstance.patch<ApiResponse<Profile>>(
      ApiRoutes.profile.base,
      payload
    )
  ).data;
};
