/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#1c4e80", // Navy Blue
          secondary: "#d97706", // Amber
          accent: "#0ea5e9", // Sky Blue
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#3b82f6", // Blue
          secondary: "#f59e0b", // Amber
          accent: "#38bdf8", // Sky Blue
        },
      },
      "light",
      "dark",
    ],
  },
}
