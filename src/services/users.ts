import { UserDTO } from "@/@types/user.dto";
import { axiosInstance } from "./axios-instance";
import { RoutesEmum } from "./routes-enum";

export const getUserByUserOrFullName = async (
  query: string,
): Promise<UserDTO[]> => {
  try {
    return (
      await axiosInstance.get<UserDTO[]>(RoutesEmum.users, {
        params: { query },
      })
    ).data;
  } catch (error) {
    console.error("getUserByUserOrFullName error:", error);
    throw new Error("Failed to fetch user by user or full name");
  }
};
