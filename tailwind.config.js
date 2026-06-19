/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neoBg: '#F3F4F6',
        neoYellow: '#FACC15',
        neoCyan: '#22D3EE',
        neoGreen: '#4ADE80',
        neoOrange: '#FB923C',
        neoBorder: '#000000',
      },
      boxShadow: {
        neo: '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        neoLg: '8px 8px 0px 0px rgba(0, 0, 0, 1)',
        neoActive: '2px 2px 0px 0px rgba(0, 0, 0, 1)',
      }
    },
  },
  plugins: [],
}
