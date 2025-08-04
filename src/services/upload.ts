import type { ApiResponse, Profile } from "@/types";
import { axiosInstance } from "./axiosInstance";
import { ApiRoutes } from "./apiRoutes";

export const uploadAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("avatar", file);

  return (
    await axiosInstance.put<ApiResponse<Profile>>(
      ApiRoutes.upload.avatar,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
  ).data;
};
