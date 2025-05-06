/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'azul-claro': '#58ADE6',
        'azul-oscuro': '#4680F6',
      },
    },
  },
  plugins: [],
}

