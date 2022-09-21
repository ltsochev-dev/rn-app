/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#333333',
        'dark-blue': '#525e75',
        tahiti: {
          DEFAULT: '#525E75',
          light: '#F1DDBF',
          brown: '#756952',
          green: '#78938A',
          'green-100': '#92ba92',
          'green-200': '#527558',
          purple: '#755270',
        },
      },
    },
  },
  plugins: [],
};
