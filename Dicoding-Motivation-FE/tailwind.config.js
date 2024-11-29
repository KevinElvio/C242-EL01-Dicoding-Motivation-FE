/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'base': ['Inter', 'sans-serif'],
        'quicksand': ['Quicksand', 'sans-serif']
      },
      colors: {
        'theme-base': '#2D3648',
        'theme-secondary': '#ABAEB6',
        'theme-shadow': '#717D96',
        'theme-sidebar': '#EDF0F7',
        'button' : '#2D3E50'
      }
    },
  },
  plugins: [],
}

