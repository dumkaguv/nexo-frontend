export const paths = {
  home: {
    root: '/'
  },

  auth: {
    login: '/login',
    register: '/register'
  },

  user: {
    root: '/user',
    byId: (id: string | number) => `/user/${id}`
  },

  settings: {
    root: '/settings',
    account: '/settings/account',
    delete: '/settings/delete'
  },

  messages: {
    root: '/messages',
    byId: (id: string | number) => `/messages/${id}`
  }
} as const
