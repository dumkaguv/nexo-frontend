export const paths = {
  home: {
    root: '/'
  },

  auth: {
    login: '/login',
    register: '/register'
  },

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
