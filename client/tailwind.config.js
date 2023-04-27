/** @type {import('tailwindcss').Config} */

// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//     "./node_modules/tw-elements/dist/js/**/*.js"
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [require("tw-elements/dist/plugin")]
// }

const konstaConfig = require('konsta/config');

module.exports = konstaConfig({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        menugreen: '#38a3a5',
        listgreen: '#A8DADC',
        brandred: '#ff0000',
      }
    },
  },
  plugins: [require("tw-elements/dist/plugin")]
});