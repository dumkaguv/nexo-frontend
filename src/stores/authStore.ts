import { User } from "@/types";
import { create } from "zustand";

type AuthStoreState = {
  user: User | null;
  setUser: (user: User) => void;
};

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
