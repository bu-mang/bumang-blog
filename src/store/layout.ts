// lib/store/useAuthStore.ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

interface InteractiveState {
  backgroundColor: string | null;
}

interface InteractiveAction {}

export const useInteractiveStore = create<
  InteractiveState & InteractiveAction
>()(
  persist(
    immer((set) => ({
      backgroundColor: null,
    })),
    {
      name: "interactive", // localStorage 키 이름
    },
  ),
);
