/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ninja: {
          dark: '#0f172a',
          card: '#1e293b',
          accent: '#8b5cf6', // Violet
          success: '#10b981', // Emerald
          text: '#f8fafc',
          muted: '#94a3b8',
          border: '#334155'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}