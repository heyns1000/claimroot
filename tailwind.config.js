/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vault-gold': '#FFD700',
        'vault-blue': '#1E3A8A',
        'nexus-purple': '#7C3AED',
        'faa-green': '#10B981',
      },
    },
  },
  plugins: [],
}
