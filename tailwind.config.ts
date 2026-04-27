import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bone: "#EEE6D2",
        "light-bone": "#F2ECE2",
        blue: "#364FA0",
        orange: "#EB4628",
        charcoal: "#262626",
      },
      fontFamily: {
        sans: ["var(--font-figtree)"],
      },
      boxShadow: {
        card: "0 18px 50px rgba(38, 38, 38, 0.08)",
      },
      borderRadius: {
        xl2: "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
