import { withDeps } from '@/utils'

export const LocalStorage = {
  token: 'token'
} as const

export const ImageFallbacks = {
  avatar: '/public/images/avatar.avif'
} as const

export const QueryKeys = {
  Posts: {
    root: withDeps('posts'),
    byId: (id: number) => withDeps('retrievePost', id)
  },

  Profile: {
    root: withDeps('profile')
  },

  Users: {
    root: withDeps('users'),
    byId: withDeps('retrieveProfile'),
    search: withDeps('usersSearch')
  }
} as const
