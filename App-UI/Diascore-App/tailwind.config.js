import { nextui } from "@nextui-org/react"; 
import typography from "@tailwindcss/typography"; 
import forms from "@tailwindcss/forms"; 

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#646cff",
        "primary-hover": "#535bf2",
        "background-color": "#1e1e2f",
        "card-bg": "#2b2b40",
        "button-bg": "#3c3c5c",
        "text-light": "rgba(255, 255, 255, 0.9)",
        "light-primary": "#213547",
        "light-primary-hover": "#3a4e78",
        "light-background": "#f9f9f9",
        "light-card-bg": "#ffffff",
        "light-button-bg": "#e0e0e0",
        "light-text": "#213547",
      },
      fontFamily: {
        "island-moments": ["Island Moments", "cursive"],
        "amaranth": ["Amaranth", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 20px rgba(0, 0, 0, 0.2)",
      },
      borderRadius: {
        lg: "12px",
      },
      backgroundImage: {
        "gradient-bg": "linear-gradient(45deg, #382efc, #feb47b)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    typography(),
    forms(),
  ],
};
