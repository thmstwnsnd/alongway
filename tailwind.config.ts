import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bone: "rgb(var(--c-bone) / <alpha-value>)",
        "light-bone": "rgb(var(--c-light-bone) / <alpha-value>)",
        blue: "rgb(var(--c-blue) / <alpha-value>)",
        "light-blue": "rgb(var(--c-light-blue) / <alpha-value>)",
        kelly: "rgb(var(--c-kelly) / <alpha-value>)",
        charcoal: "rgb(var(--c-charcoal) / <alpha-value>)",
      },

      fontFamily: {
        sans: ["'Noir Pro'", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        display: ["Termina", "'Noir Pro'", "Helvetica Neue", "sans-serif"],
        accent: ["'Jukebox Johnny'", "Georgia", "serif"],
        noir: ["'Noir Pro'", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        jukebox: ["'Jukebox Johnny'", "Georgia", "serif"],
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
