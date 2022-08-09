/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#214D71',
        'primary-2': '#4E7693',
        card: '#E9E9E980',
        backdrop: '#C4C4C4BF',
      },
      boxShadow: {
        nav: '0px -2px 5px 0px #C4C4C440',
        card: '0px 2px 5px 0px #C4C4C440',
      },
    },
  },
  plugins: [],
};
