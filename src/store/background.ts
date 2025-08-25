// lib/store/useAuthStore.ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type BackgroundItem = [number, "Ascii3DLily" | "HandDeepInside"];

interface BackgroundState {
  backgroundColor: string | undefined | null; // tailwind Utils
  backgroundImage: string | undefined | null; // url or null

  home: {
    list: BackgroundItem[];
    selectedIndex: number;
  };

  work: {
    centerText: boolean;
  };
}

interface BackgroundAction {
  setBackgroundColor: (v: string | undefined | null) => void;
  setBackgroundImage: (v: string | undefined | null) => void;

  home: {
    setSelectedItem: (v: number) => void;
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
      list: [
        [0, "Ascii3DLily"],
        [1, "HandDeepInside"],
      ],
      selectedIndex: 0,

      setSelectedItem: (selectedIndex: number) =>
        set((state) => {
          state.home.selectedIndex = selectedIndex;
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
