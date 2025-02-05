// tailwind.d.ts
import "tailwindcss";

declare module "tailwindcss" {
  interface ThemeColors {
    gray: {
      "1000": string;
      "900": string;
      "800": string;
      "700": string;
      "600": string;
      "500": string;
      "400": string;
      "300": string;
      "200": string;
      "100": string;
      "50": string;
      "10": string;
      "5": string;
      "1": string;
      "0": string;
    };
  }
}
