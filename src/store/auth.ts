// lib/store/useAuthStore.ts
import { create } from "zustand";
// import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
}

interface AuthAction {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

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

export const useAuthStore = create<AuthState & AuthAction>()((set) => ({
  isAuthenticated: false,

  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));
