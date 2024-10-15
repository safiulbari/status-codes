/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode using the class strategy
  theme: {
    extend: {
      fontFamily: {
        'suse': ['"SUSE"', 'sans-serif'], // Add the SUSE font family here
      },
    },
  },
  plugins: [],
}
