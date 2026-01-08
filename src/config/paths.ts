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

  conversations: {
    root: '/conversations',
    new: '/conversations/new',
    byId: (id: string | number) => `/conversations/${id}`
  }
} as const
