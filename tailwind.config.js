/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,svelte}'],
  theme: {
    extend: {
      colors: {
        'silver': {
          DEFAULT: '#E4E4E7'
        },
        'dovegray': {
          DEFAULT: '#71717A'
        },
        'background': {
          DEFAULT: '#FBFBFB'
        }
      }
    },
  },
  plugins: [],
}

