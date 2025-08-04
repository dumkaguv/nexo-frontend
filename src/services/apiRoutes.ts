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
  upload: {
    base: "upload",
    avatar: "/upload/avatar",
  },
  profile: {
    base: "/profile",
  },
} as const;
