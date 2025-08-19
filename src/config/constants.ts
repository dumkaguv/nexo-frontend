export const LocalStorage = {
  token: 'token'
} as const

export const ImageFallbacks = {
  avatar: '/public/images/avatar.avif'
} as const

export const QueryKeys = {
  Posts: {
    root: 'posts',
    byId: 'retrievePost'
  },

  Profile: {
    root: 'profile'
  },

  Users: {
    root: 'users',
    byId: 'retrieveProfile',
    search: 'usersSearch'
  }
} as const
