/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        box: '0px 0px 8px 8px rgba(18,139,204,0.86);',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
