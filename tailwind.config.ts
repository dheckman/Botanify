import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-green': '#D0E0B5',
        'button-red': '#CD0100',
        'overlay-gray': '#D9D9D9'
      }
    },
    fontFamily: {
      inter: ['Inter']
    }
  },
  plugins: []
} satisfies Config;
