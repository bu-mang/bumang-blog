// lib/store/useAuthStore.ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface BackgroundState {
  backgroundColor: string | undefined | null; // tailwind Utils
  backgroundImage: string | undefined | null; // url or null

  home: {
    list: Record<number, "Ascii3DBackground" | "HandDeepInside">;
    selected: number;
  };

  work: {
    centerText: boolean;
  };
}

interface BackgroundAction {
  setBackgroundColor: (v: string | undefined | null) => void;
  setBackgroundImage: (v: string | undefined | null) => void;

  home: {
    setSelected: (v: number) => void;
  };

  work: {
    setCenterText: (v: boolean) => void;
  };
}

export const useBackgroundStore = create<BackgroundState & BackgroundAction>()(
  immer((set) => ({
    backgroundColor: null,
    backgroundImage: null,

    home: {
      list: {
        0: "Ascii3DBackground",
        1: "HandDeepInside",
      },
      selected: 0,

      setSelected: (selected: number) =>
        set((state) => {
          state.home.selected = selected;
        }),
    },

    work: {
      centerText: true,
      setCenterText: (isCenterText: boolean) =>
        set((state) => {
          state.work.centerText = isCenterText;
        }),
    },

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
