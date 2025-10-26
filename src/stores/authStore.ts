import { create } from 'zustand'

import type { UserResponseWithRelationsDto } from '@/api'

type AuthStoreState = {
  user?: UserResponseWithRelationsDto
  isPendingUser: boolean

  setUser: (user?: UserResponseWithRelationsDto) => void
  setIsPendingUser: (isPendingUser: boolean) => void
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: undefined,
  isPendingUser: true,

  setUser: (user) => set({ user }),
  setIsPendingUser: (isPendingUser) => set({ isPendingUser })
}))
