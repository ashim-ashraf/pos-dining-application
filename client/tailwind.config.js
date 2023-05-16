/** @type {import('tailwindcss').Config} */

const konstaConfig = require('konsta/config');

module.exports = konstaConfig({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        menugreen: '#38a3a5',
        listgreen: '#A8DADC',
        brandred: '#ff0000',
        fabblue: '#8ECAE6',
      }
    },
  },
  plugins: [require("tw-elements/dist/plugin")]
});