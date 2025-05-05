// lib/store/useAuthStore.ts
import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  setToken: (accessToken) => set({ accessToken }),
}));
