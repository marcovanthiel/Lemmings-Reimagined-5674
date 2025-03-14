/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'game-primary': '#2C3E50',
        'game-secondary': '#34495E',
        'lemming': '#27AE60',
        'terrain': '#795548'
      },
      animation: {
        'walk': 'walk 0.5s steps(4) infinite',
        'fall': 'fall 0.3s linear infinite',
      },
      keyframes: {
        walk: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(32px)' }
        },
        fall: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(32px)' }
        }
      }
    },
  },
  plugins: [],
}