import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/providers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
        poppins: ["var(--font-poppins)"],
      },
      colors: {
        dark: {
          primary: "#222222",
          secondary: "#161616",
          tertiary: "#000000",
        },
      },
      backgroundImage: {
        "auth-banner": "url('/backgrounds/bg_unimar.jpg')",
      },
    },
  },
  plugins: [],
};
export default config;
