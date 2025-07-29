import { create } from "zustand";
import type { Profile, User } from "@/types";

type AuthStoreState = {
  user: User | null;
  profile: Profile | null;

  isPendingUser: boolean;
  isPendingProfile: boolean;

  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  setIsPendingUser: (isPendingUser: boolean) => void;
  setIsPendingProfile: (isPendingProfile: boolean) => void;
};

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: null,
  profile: null,

  isPendingUser: false,
  isPendingProfile: false,

  setUser: (user) => set({ user }),
  setIsPendingUser: (isPendingUser) => set({ isPendingUser }),
  setProfile: (profile) => set({ profile }),
  setIsPendingProfile: (isPendingProfile) => set({ isPendingProfile }),
}));
