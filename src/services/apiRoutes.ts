export const ApiRoutes = {
  users: {
    base: "/users",
  },
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    registration: "/auth/registration",
  },
  profile: {
    base: "/profile",
  },
} as const;
