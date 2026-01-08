import { create } from 'zustand'

type OnlineUsersState = {
  onlineUserIds: Set<number>
  setOnlineUsers: (userIds: number[]) => void
  setOnline: (userId: number) => void
  setOffline: (userId: number) => void
  reset: () => void
}

export const useOnlineUsersStore = create<OnlineUsersState>((set) => ({
  onlineUserIds: new Set<number>(),

  setOnlineUsers: (userIds) => set({ onlineUserIds: new Set(userIds) }),

  setOnline: (userId) =>
    set((state) => {
      const next = new Set(state.onlineUserIds)

      next.add(userId)

      return { onlineUserIds: next }
    }),

  setOffline: (userId) =>
    set((state) => {
      if (!state.onlineUserIds.has(userId)) {
        return state
      }

      const next = new Set(state.onlineUserIds)

      next.delete(userId)

      return { onlineUserIds: next }
    }),

  reset: () => set({ onlineUserIds: new Set<number>() })
}))
