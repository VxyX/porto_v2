/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './src/**/*.{css,scss}'
  ],
  theme: {
    extend: {
      colors: {
        /* Dark mode surface colors */
        dark: {
          950: '#0b031b',
          900: '#0f0520',
          800: '#1a0a2e',
          700: '#261042',
        },
        /* Light mode surface colors */
        light: {
          50:  '#fdf6ff',
          100: '#f5e8ff',
          200: '#e8d0ff',
        },
        /* Primary accent – vivid pink from old porto */
        pink: {
          400: '#e066f5',
          500: '#d448f7',
          600: '#c030e0',
        },
        /* Secondary accent – rich purple from old porto */
        purple: {
          400: '#a855f7',
          500: '#9027f1',
          600: '#7c10d8',
          700: '#6309b5',
        },
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        inter:  ['Inter',  'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}