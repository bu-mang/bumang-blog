// lib/store/useAuthStore.ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface InteractiveState {
  textColor: string;
  backgroundColor: string | null; // tailwind Utils
  backgroundImage: string | null; // url or null
  index: number;
}

interface InteractiveAction {}

export const useInteractiveStore = create<
  InteractiveState & InteractiveAction
>()(
  immer((set) => ({
    textColor: "",
    backgroundColor: null,
    backgroundImage: null,
    index: Math.floor(Math.random() * 10),
  })),
);
