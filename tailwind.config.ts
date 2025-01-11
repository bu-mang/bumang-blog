import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // 다크 모드를 class 기반으로 설정
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "Pretendard Variable", "sans-serif"], // 기본 폰트
      },
      fontSize: {
        10: ["0.625rem", { lineHeight: "1rem", letterSpacing: "-0.04em" }], // 10px font size
        12: ["0.75rem", { lineHeight: "1.125rem", letterSpacing: "-0.04em" }], // 12px font size
        14: ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "-0.04em" }], // 14px font size
        16: ["1rem", { lineHeight: "1.5rem", letterSpacing: "-0.04em" }], // 16px font size
        18: ["1.125rem", { lineHeight: "1.675rem", letterSpacing: "-0.04em" }], // 18px font size
        20: ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "-0.04em" }], // 20px font size
        22: ["1.375rem", { lineHeight: "1.875rem", letterSpacing: "-0.04em" }], // 22px font size
        24: ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.04em" }], // 24px font size
        26: ["1.625rem", { lineHeight: "2.25rem", letterSpacing: "-0.05em" }], // 26px font size
        28: ["1.75rem", { lineHeight: "2.375rem", letterSpacing: "-0.05em" }], // 28px font size
        30: ["1.875rem", { lineHeight: "2.5rem", letterSpacing: "-0.05em" }], // 30px font size
        32: ["2rem", { lineHeight: "2.75rem", letterSpacing: "-0.05em" }], // 32px font size
        34: ["2.125rem", { lineHeight: "2.875rem", letterSpacing: "-0.05em" }], // 34px font size
        36: ["2.25rem", { lineHeight: "3rem", letterSpacing: "-0.05em" }], // 36px font size
        38: ["2.375rem", { lineHeight: "3.25rem", letterSpacing: "-0.05em" }], // 38px font size
        40: ["2.5rem", { lineHeight: "3.5rem", letterSpacing: "-0.05em" }], // 40px font size
        42: ["2.625rem", { lineHeight: "3.625rem", letterSpacing: "-0.05em" }], // 42px font size
        44: ["2.75rem", { lineHeight: "3.875rem", letterSpacing: "-0.05em" }], // 44px font size
        46: ["2.875rem", { lineHeight: "4rem", letterSpacing: "-0.05em" }], // 46px font size
        48: ["3rem", { lineHeight: "4.25rem", letterSpacing: "-0.05em" }], // 48px font size
        50: ["3.125rem", { lineHeight: "4.375rem", letterSpacing: "-0.05em" }], // 50px font size
        52: ["3.25rem", { lineHeight: "4.5rem", letterSpacing: "-0.05em" }], // 52px font size
        54: ["3.375rem", { lineHeight: "4.625rem", letterSpacing: "-0.05em" }], // 54px font size
        56: ["3.5rem", { lineHeight: "4.75rem", letterSpacing: "-0.05em" }], // 56px font size
        58: ["3.625rem", { lineHeight: "4.875rem", letterSpacing: "-0.05em" }], // 58px font size
        60: ["3.75rem", { lineHeight: "5rem", letterSpacing: "-0.05em" }], // 60px font size
        62: ["3.875rem", { lineHeight: "5.25rem", letterSpacing: "-0.05em" }], // 62px font size
        64: ["4rem", { lineHeight: "5.5rem", letterSpacing: "-0.05em" }], // 64px font size
        66: ["4.125rem", { lineHeight: "5.75rem", letterSpacing: "-0.05em" }], // 66px font size
        68: ["4.25rem", { lineHeight: "6rem", letterSpacing: "-0.05em" }], // 68px font size
        70: ["4.375rem", { lineHeight: "6.25rem", letterSpacing: "-0.05em" }], // 70px font size
        72: ["4.5rem", { lineHeight: "6.5rem", letterSpacing: "-0.05em" }], // 72px font size
        74: ["4.625rem", { lineHeight: "6.75rem", letterSpacing: "-0.05em" }], // 74px font size
        76: ["4.75rem", { lineHeight: "7rem", letterSpacing: "-0.05em" }], // 76px font size
        78: ["4.875rem", { lineHeight: "7.25rem", letterSpacing: "-0.05em" }], // 78px font size
        80: ["5rem", { lineHeight: "7.5rem", letterSpacing: "-0.06em" }], // 80px font size
        82: ["5.125rem", { lineHeight: "7.75rem", letterSpacing: "-0.06em" }], // 82px font size
        84: ["5.25rem", { lineHeight: "8rem", letterSpacing: "-0.06em" }], // 84px font size
        86: ["5.375rem", { lineHeight: "8.25rem", letterSpacing: "-0.06em" }], // 86px font size
        88: ["5.5rem", { lineHeight: "8.5rem", letterSpacing: "-0.06em" }], // 88px font size
        90: ["5.625rem", { lineHeight: "8.75rem", letterSpacing: "-0.06em" }], // 90px font size
        92: ["5.75rem", { lineHeight: "9rem", letterSpacing: "-0.06em" }], // 92px font size
        94: ["5.875rem", { lineHeight: "9.25rem", letterSpacing: "-0.06em" }], // 94px font size
        96: ["6rem", { lineHeight: "9.5rem", letterSpacing: "-0.06em" }], // 96px font size
        98: ["6.125rem", { lineHeight: "9.75rem", letterSpacing: "-0.06em" }], // 98px font size
        100: ["6.25rem", { lineHeight: "10rem", letterSpacing: "-0.06em" }], // 100px font size
      },

      borderRadius: {
        2: "2px",
        4: "4px",
        8: "8px",
        6: "6px",
        10: "10px",
        12: "12px",
        14: "14px",
        16: "16px",
        18: "18px",
        20: "20px",
        22: "22px",
        24: "24px",
        26: "26px",
        28: "28px",
        30: "30px",
        32: "32px",
      },
      letterSpacing: {
        looser: "-0.02em",
        noSpacing: "0em",
      },
      spacing: {
        layout: "12px",
        header: "100px",
        "header-2": "88px",
        "header-margin": "40px",
      },
      colors: {
        gray: {
          1000: "#121212",
          900: "#141414",
          800: "#1D1D1D",
          700: "#2C2C2C",
          600: "#373737",
          500: "#4D4D4D",
          400: "#616161",
          300: "#818181",
          200: "#999999",
          100: "#B4B4B4",
          50: "#D9D9D9",
          10: "#EDE5E5",
          5: "#EDEDED",
          1: "#F8F8F8",
          0: "#FFFFFF",
        },
        blue: {
          light: "#3B82F6", // 밝은 파란색
          DEFAULT: "#1D4ED8", // 기본 파란색 (기본값)
          dark: "#1E40AF", // 어두운 파란색
        },
        red: {
          light: "#F87171", // 밝은 빨간색
          DEFAULT: "#EF4444", // 기본 빨간색
          dark: "#B91C1C", // 어두운 빨간색
        },
      },
      animation: {
        arrow: "arrow 1s ease-out infinite",
        "slide-up": "slide-up 0.3s ease-in-out",
      },
      keyframes: {
        arrow: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(40px)", opacity: "0" },
          "100%": { transform: "translateY(0%)", opacity: "1" },
        },
        blink: {},
      },
    },
  },
  plugins: [],
};
export default config;
