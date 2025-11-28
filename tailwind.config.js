/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './src/**/*.{css,scss}'
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0f0f23',
          800: '#1a1a2e',
          700: '#16213e',
        },
        purple: {
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        blue: {
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}