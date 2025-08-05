export const ApiRoutes = {
  users: {
    base: "/users",
    changePassword: "/users/change-password",
  },
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    registration: "/auth/registration",
  },
  upload: {
    base: "/upload",
    avatar: "/upload/avatar",
  },
  profile: {
    base: "/profile",
  },
  posts: {
    base: "/posts",
    byId: (postId: number) => `/posts/${postId}`,
  },
} as const;
