import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryText: "#1C1C1C",
        secondaryText: "#616161",
        foreground: "#F5F5F5",
        hover: "#FBFBFB",
        border: "#F0F0F0"
      },
      keyframes: {
        fadeAndScaleIn: {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)"
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",

          }
        }
      },
      animation: {
        fadeAndScaleIn: "fadeAndScaleIn 0.2s ease-in-out"
      },
    },
  },
  plugins: [],
};
export default config;
