/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './*.html',
    './pages/*.html',
    './inventory/*.html',
    './production/*.html',
    './sales/*.html',
      //trang mới
    './marketing/*.html',

    './purchases/*.html',
    './distribution/*.html',
    './stores/*.html',
    './invoices/*.html',
    './customers/*.html',
    './suppliers/*.html',
    './expenses/*.html',
    './reports/*.html',
    './settings/*.html',
    './users/*.html',
    './assets/js/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#22B573',
          dark: '#15945A',
          light: '#EAF8F1',
        },
        surface: '#FFFFFF',
        background: '#F6F8FA',
        brand: '#17212B',
        muted: '#6B7280',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
