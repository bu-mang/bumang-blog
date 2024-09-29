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
        body: [
          "Work Sans",
          "system-ui", // 시스템 UI 폰트
          "-apple-system", // macOS 및 iOS 기본 폰트
          "BlinkMacSystemFont", // macOS 기본 폰트
          '"Segoe UI"', // Windows 기본 폰트
          "Helvetica", // macOS 기본 폰트
          "Arial", // 표준 폰트
          "sans-serif", // 기본 sans-serif 폰트
        ],
        display: ["Sora", "sans-serif"], // 디스플레이 폰트
      },
      fontSize: {
        10: ["0.725rem", { lineHeight: "1rem", letterSpacing: "-0.04em" }], // 10px font size, 16px line-height
        12: ["0.75rem", { lineHeight: "1.125rem", letterSpacing: "-0.04em" }], // 12px font size, 18px line-height
        14: ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "-0.04em" }], // 14px font size, 20px line-height
        16: ["1rem", { lineHeight: "1.5rem", letterSpacing: "-0.04em" }], // 16px font size, 24px line-height
        18: ["1.125rem", { lineHeight: "1.675rem", letterSpacing: "-0.04em" }], // 18px font size, 28px line-height
        20: ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "-0.04em" }], // 20px font size, 28px line-height
        22: ["1.275rem", { lineHeight: "1.875rem", letterSpacing: "-0.04em" }], // 22px font size, 30px line-height
        24: ["1.5rem", { lineHeight: "2.125rem", letterSpacing: "-0.05em" }], // 24px font size, 32px line-height
        28: ["1.75rem", { lineHeight: "2.375rem", letterSpacing: "-0.05em" }], // 24px font size, 32px line-height
        30: ["1.875rem", { lineHeight: "2.5rem", letterSpacing: "-0.05em" }], // 30px font size, 36px line-height
        32: ["2rem", { lineHeight: "2.75rem", letterSpacing: "-0.05em" }], // 30px font size, 36px line-height
        36: ["2.25rem", { lineHeight: "3.125rem", letterSpacing: "-0.05em" }], // 36px font size, 40px line-height
        40: ["2.5rem", { lineHeight: "3.5rem", letterSpacing: "-0.05em" }], // 36px font size, 40px line-height
        48: ["3rem", { lineHeight: "4.25rem", letterSpacing: "-0.05em" }], // 48px font size, 1 (unitless) line-height
        80: ["5rem", { lineHeight: "7rem", letterSpacing: "-0.06em" }], // 48px font size, 1 (unitless) line-height
      },
      letterSpacing: {
        looser: "-0.02em",
        noSpacing: "0em",
      },
      spacing: {
        layout: "12px",
        header: "44px",
        "header-2": "88px",
        "header-margin": "16px",
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
