// lib/store/useAuthStore.ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);
const gray = fullConfig.theme.colors.gray as Record<string, string>;

interface InteractiveState {
  textColor: string;
  backgroundColor: string | undefined | null; // tailwind Utils
  backgroundImage: string | undefined | null; // url or null

  header: {
    animState: "ANIM" | "MIN" | "MAX";
    borderBottom: string | undefined | null;
    backgroundColor: string | undefined | null;
  };

  home: {};

  work: {
    centerText: boolean;
  };
}

interface InteractiveAction {
  setTextColor: (v: string) => void;
  setBackgroundColor: (v: string | undefined | null) => void;
  setBackgroundImage: (v: string | undefined | null) => void;

  header: {
    setAnimState: (v: "ANIM" | "MIN" | "MAX") => void;
    setBorderBottom: (v: string | undefined | null) => void;
    setBackgroundColor: (v: string | undefined | null) => void;
    setDefaultSetting: (v: string) => void;
  };

  work: {
    setCenterText: (v: boolean) => void;
  };
}

export const useInteractiveStore = create<
  InteractiveState & InteractiveAction
>()(
  immer((set) => ({
    textColor: "text-black",
    backgroundColor: null,
    backgroundImage: null,

    home: {},

    header: {
      animState: "ANIM",
      borderBottom: gray?.["10"],
      backgroundColor: "bg-transparent",

      setAnimState: (animState: "ANIM" | "MIN" | "MAX") => {
        set((state) => {
          state.header.animState = animState;
        });
      },
      setDefaultSetting: (theme: string) => {
        set((state) => {
          state.header.borderBottom = gray?.["10"];
          state.header.backgroundColor = "bg-background";
        });
      },
      setBorderBottom: (borderBottom: string | undefined | null) =>
        set((state) => {
          state.header.borderBottom = borderBottom;
        }),
      setBackgroundColor: (backgroundColor: string | undefined | null) =>
        set((state) => {
          if (typeof backgroundColor === "string") {
            state.header.backgroundColor = backgroundColor;
            return;
          }

          state.header.backgroundColor = "bg-transparent";
        }),
    },

    work: {
      centerText: true,
      setCenterText: (isCenterText: boolean) =>
        set((state) => {
          state.work.centerText = isCenterText;
        }),
    },

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
