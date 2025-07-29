import type { AuthResponse, User } from "@/types";

export const getUserFromAuthResponse = (response: AuthResponse): User => ({
  userId: response.user.userId,
  email: response.user.email,
  isActivated: response.user.isActivated,
  createdAt: response.user.createdAt,
});
