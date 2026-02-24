/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {

      // STEP 1 — Define motion
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },

      // STEP 2 — Give it a name
      animation: {
        float: "float 3s ease-in-out infinite",
      },

    },
  },
  plugins: [],
}

