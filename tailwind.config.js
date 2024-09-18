/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "600px",
        md: "738px",
        lg: "994px",
        xl: "1220px",
        "2xl": "1400px",
      },
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "5rem",
      },
    },
    fontFamily: {
      Mod: ["Moderustic", "sans-serif"],
      Mate: ["Matemasie", "sans-serif"],
    },
    colors: {
      dark: "#17252A",
      light: "#DEF2F1",
      btn: "#3AAFA9",
      btnH: "#2B7A78",
      textO: "#FEFFFF",
    },
    extend: {},
  },
  plugins: [],
};
