/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#00ff41',
        'dark-bg': '#0a0a0a',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 255, 65, 0.5)',
      }
    },
  },
  plugins: [],
}