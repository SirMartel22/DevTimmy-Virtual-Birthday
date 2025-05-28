/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
       "div-shadow": "0 4px 20px rgba(92, 102, 108, 0.3)"
      }
    },
  },
  plugins: [],
}

