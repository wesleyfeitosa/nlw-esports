/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './index.html'],
  theme: {
    extend: {
      colors: {},
      backgroundImage: {
        'nlw-gradient':
          'linear-gradient(89.86deg, #9572FC 30.00%, #43E7AD 50.00%, #E1D55D 70.00%)',
        galaxy: "url('./background-galaxy.png')",
      },
    },
  },
  plugins: [],
};
