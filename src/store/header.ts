// lib/store/useAuthStore.ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);
const gray = fullConfig.theme.colors.gray as Record<string, string>;

interface HeaderState {
  animState: "ANIM" | "MIN" | "MAX";
  borderBottom: string | undefined | null;
  backgroundColor: string | undefined | null;
  letterColor: string;
}

interface HeaderAction {
  setAnimState: (v: "ANIM" | "MIN" | "MAX") => void;
  setBorderBottom: (v: string | undefined | null) => void;
  setBackgroundColor: (v: string | undefined | null) => void;
  setDefaultSetting: (v: string) => void;
  setLetterColor: (v: string) => void;
}

export const useHeaderStore = create<HeaderState & HeaderAction>()(
  immer((set) => ({
    animState: "ANIM",
    borderBottom: gray?.["10"],
    backgroundColor: "bg-transparent",
    letterColor: "black",

    setLetterColor: (letterColor: string) => {
      set((state) => {
        state.letterColor = letterColor;
      });
    },

    setAnimState: (animState: "ANIM" | "MIN" | "MAX") => {
      set((state) => {
        state.animState = animState;
      });
    },
    setDefaultSetting: (theme: string) => {
      set((state) => {
        state.borderBottom = gray?.["10"];
        state.backgroundColor = "bg-background";
      });
    },
    setBorderBottom: (borderBottom: string | undefined | null) =>
      set((state) => {
        state.borderBottom = borderBottom;
      }),
    setBackgroundColor: (backgroundColor: string | undefined | null) =>
      set((state) => {
        if (typeof backgroundColor === "string") {
          state.backgroundColor = backgroundColor;
          return;
        }

        state.backgroundColor = "bg-transparent";
      }),
  })),
);
