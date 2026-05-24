import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "#1C3B6E",
        crimson: "#C0392B",
        steel: "#5A7080",
        muted: "#8899AA",
        cream: "#EDE8E0",
        creamAlt: "#E0D9CF",
        darkNavy: "#152D55",
        deepCrimson: "#8B1A1A",
        grayBlue: "#B0B8C4",
        dustyRose: "#C4A0A0",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 18px 50px rgba(28, 59, 110, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
