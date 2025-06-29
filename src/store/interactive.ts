// lib/store/useAuthStore.ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface InteractiveState {
  textColor: string;
  backgroundColor: string | undefined | null; // tailwind Utils
  backgroundImage: string | undefined | null; // url or null
}

interface InteractiveAction {
  setTextColor: (v: string) => void;
  setBackgroundColor: (v: string | undefined | null) => void;
  setBackgroundImage: (v: string | undefined | null) => void;
}

export const useInteractiveStore = create<
  InteractiveState & InteractiveAction
>()(
  immer((set) => ({
    textColor: "text-black",
    backgroundColor: null,
    backgroundImage: null,

    setTextColor: (textColor) =>
      set((state) => {
        state.textColor = textColor;
      }),
    setBackgroundColor: (backgroundColor) =>
      set((state) => {
        state.backgroundColor = backgroundColor;
      }),
    setBackgroundImage: (backgroundImage) =>
      set((state) => {
        state.backgroundImage = backgroundImage;
      }),
  })),
);
