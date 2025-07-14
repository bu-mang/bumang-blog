// lib/store/useAuthStore.ts
import { UserType } from "@/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
// import { persist } from "zustand/middleware";

interface AuthState {
  // 쿠키에서 parsing
  isAuthLoading: boolean;
  isAuthenticated: boolean;

  // GET User API
  user: UserType | null; // nickname, role, id
}

interface AuthAction {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: UserType) => void;
  setUserAndIsAuthenticated: (data: AuthState) => void;
}

export const useAuthStore = create<AuthState & AuthAction>()(
  immer((set) => ({
    isAuthLoading: true,
    isAuthenticated: false,
    user: null,

    setIsAuthenticated: (isAuthenticated) =>
      set((state) => {
        state.isAuthenticated = isAuthenticated;
        state.isAuthLoading = false;
      }),
    setUser: (user) =>
      set((state) => {
        state.user = user;
        state.isAuthLoading = false;
      }),
    setUserAndIsAuthenticated: (all) =>
      set((state) => {
        state.isAuthenticated = all.isAuthenticated;
        state.user = all.user;
        state.isAuthLoading = all.isAuthLoading;
      }),
  })),
);
