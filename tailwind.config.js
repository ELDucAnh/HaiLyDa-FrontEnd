/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './*.html',
    './pages/*.html',
    './inventory/*.html',
    './sales/*.html',
    './purchases/*.html',
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
