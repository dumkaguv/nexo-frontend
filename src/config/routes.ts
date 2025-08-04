export const Routes = {
  home: "/",
  login: "/login",
  register: "/register",
  messages: "/messages",
  settings: {
    base: "/settings",
    account: "/settings/account",
    delete: "/settings/delete",
  },
  activate: "/activate",
} as const;
