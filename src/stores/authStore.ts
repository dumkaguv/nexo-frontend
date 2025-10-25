import { create } from 'zustand'

import type { UserResponseDto } from '@/api'

import type { Profile } from '@/types'

type AuthStoreState = {
  user?: UserResponseDto
  profile: Profile | null

  isPendingUser: boolean
  isPendingProfile: boolean

  setUser: (user?: UserResponseDto) => void
  setProfile: (profile: Profile | null) => void
  setIsPendingUser: (isPendingUser: boolean) => void
  setIsPendingProfile: (isPendingProfile: boolean) => void
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: undefined,
  profile: null,

  isPendingUser: false,
  isPendingProfile: false,

  setUser: (user) => set({ user }),
  setIsPendingUser: (isPendingUser) => set({ isPendingUser }),
  setProfile: (profile) => set({ profile }),
  setIsPendingProfile: (isPendingProfile) => set({ isPendingProfile })
}))
