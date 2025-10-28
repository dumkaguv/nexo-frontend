import { create } from 'zustand'

import type { ResponseProfileDetailedDto } from '@/api'

type AuthStoreState = {
  user?: ResponseProfileDetailedDto['user']
  isPendingUser: boolean

  setUser: (user?: ResponseProfileDetailedDto['user']) => void
  setIsPendingUser: (isPendingUser: boolean) => void
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: undefined,
  isPendingUser: true,

  setUser: (user) => set({ user }),
  setIsPendingUser: (isPendingUser) => set({ isPendingUser })
}))
