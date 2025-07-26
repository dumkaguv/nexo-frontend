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
} as const;
