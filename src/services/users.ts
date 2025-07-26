import { User } from "@/types";
import { axiosInstance } from "./axiosInstance";
import { ApiRoutes } from "./apiRoutes";

export const getUserByUserOrFullName = async (name: string) => {
  return (
    await axiosInstance.get<User[]>(ApiRoutes.users.base, {
      params: { name },
    })
  ).data;
};
