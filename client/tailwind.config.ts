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
        border: "#F0F0F0"
      }
    },
  },
  plugins: [],
};
export default config;
