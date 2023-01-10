/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'outline-pink-300',
    'outline-green-300',
    'bg-cyan-600',
    'bg-cyan-400',
    {
      pattern: /grid-cols-*/,
    },
    {
      pattern: /grid-rows-*/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
