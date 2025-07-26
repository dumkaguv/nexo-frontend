export const ApiRoutes = {
  users: {
    base: "/users",
  },
  auth: {
    login: "/login",
    logout: "/logout",
    refresh: "/refresh",
    register: "/register",
  },
} as const;
