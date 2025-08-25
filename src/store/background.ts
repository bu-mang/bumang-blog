// lib/store/useAuthStore.ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);
const gray = fullConfig.theme.colors.gray as Record<string, string>;

interface BackgroundState {
  backgroundColor: string | undefined | null; // tailwind Utils
  backgroundImage: string | undefined | null; // url or null

  // header: {
  //   animState: "ANIM" | "MIN" | "MAX";
  //   borderBottom: string | undefined | null;
  //   backgroundColor: string | undefined | null;
  //   letterColor: string;
  // };

  home: {};

  work: {
    centerText: boolean;
  };
}

interface BackgroundAction {
  setBackgroundColor: (v: string | undefined | null) => void;
  setBackgroundImage: (v: string | undefined | null) => void;

  // header: {
  //   setAnimState: (v: "ANIM" | "MIN" | "MAX") => void;
  //   setBorderBottom: (v: string | undefined | null) => void;
  //   setBackgroundColor: (v: string | undefined | null) => void;
  //   setDefaultSetting: (v: string) => void;
  //   setLetterColor: (v: string) => void;
  // };

  work: {
    setCenterText: (v: boolean) => void;
  };
}

export const useBackgroundStore = create<BackgroundState & BackgroundAction>()(
  immer((set) => ({
    backgroundColor: null,
    backgroundImage: null,

    home: {},

    // header: {
    //   animState: "ANIM",
    //   borderBottom: gray?.["10"],
    //   backgroundColor: "bg-transparent",
    //   letterColor: "black",

    //   setLetterColor: (letterColor: string) => {
    //     set((state) => {
    //       state.header.letterColor = letterColor;
    //     });
    //   },

    //   setAnimState: (animState: "ANIM" | "MIN" | "MAX") => {
    //     set((state) => {
    //       state.header.animState = animState;
    //     });
    //   },
    //   setDefaultSetting: (theme: string) => {
    //     set((state) => {
    //       state.header.borderBottom = gray?.["10"];
    //       state.header.backgroundColor = "bg-background";
    //     });
    //   },
    //   setBorderBottom: (borderBottom: string | undefined | null) =>
    //     set((state) => {
    //       state.header.borderBottom = borderBottom;
    //     }),
    //   setBackgroundColor: (backgroundColor: string | undefined | null) =>
    //     set((state) => {
    //       if (typeof backgroundColor === "string") {
    //         state.header.backgroundColor = backgroundColor;
    //         return;
    //       }

    //       state.header.backgroundColor = "bg-transparent";
    //     }),
    // },

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
