import { create } from "zustand";
import type { User } from "@/types";

type AuthStoreState = {
  user: User | null;
  isPending: boolean;
  setUser: (user: User | null) => void;
  setIsPending: (isPending: boolean) => void;
};

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: null,
  isPending: false,
  setUser: (user) => set({ user }),
  setIsPending: (isPending) => set({ isPending }),
}));
