// lib/store/useAuthStore.ts
import { UserType } from "@/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
// import { persist } from "zustand/middleware";

interface AuthState {
  // 쿠키에서 parsing
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
    isAuthenticated: false,
    user: null,

    setIsAuthenticated: (isAuthenticated) =>
      set((state) => {
        state.isAuthenticated = isAuthenticated;
      }),
    setUser: (user) =>
      set((state) => {
        state.user = user;
      }),
    setUserAndIsAuthenticated: (all) =>
      set((state) => {
        state.isAuthenticated = all.isAuthenticated;
        state.user = all.user;
      }),
  })),
);

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       accessToken: null,
//       setToken: (accessToken) => set({ accessToken }),
//     }),
//     {
//       name: "accessToken", // localStorage에 저장될 key 이름
//     },
//   ),
// );
