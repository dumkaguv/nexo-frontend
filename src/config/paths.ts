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

  // todo: replace all profile paths to user paths
  profile: {
    root: '/profile'
  },

  settings: {
    root: '/settings',
    account: '/settings/account',
    delete: '/settings/delete'
  },

  messages: {
    root: '/messages'
  }
} as const
