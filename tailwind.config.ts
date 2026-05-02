import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bone: "#EEE6D2",
        "light-bone": "#F2ECE2",
        blue: "#364FA0",
        "light-blue": "#94A6D2",
        kelly: "#3A7D44",
        charcoal: "#262626",
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
