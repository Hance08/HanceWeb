/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand', 'LXGW WenKai TC', 'sans-serif'],
        chinese: ['LXGW WenKai TC', 'sans-serif'],
        icon: ['Material Icons'],
        fa: ['Font Awesome 6 Free'],
      },
    },
  },
  plugins: [],
}

