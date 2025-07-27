import { AuthResponse } from "@/services/auth";
import { User } from "@/types";

export const getUserFromAuthResponse = (response: AuthResponse): User => ({
  userId: response.userId,
  userName: response.userName,
  fullName: response.fullName,
  email: response.email,
  isActivated: response.isActivated,
  createdAt: response.createdAt,
});
