import { create } from 'zustand'

import type { ResponseProfileDetailedDto } from '@/shared/api'

type AuthStoreState = {
  user?: ResponseProfileDetailedDto['user']
  isUserLoading: boolean

  setUser: (user?: ResponseProfileDetailedDto['user']) => void
  setIsUserLoading: (isUserLoading: boolean) => void
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: undefined,
  isUserLoading: true,

  setUser: (user) => set({ user }),
  setIsUserLoading: (isUserLoading) => set({ isUserLoading })
}))
