import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-green': '#D0E0B5',
        'button-red': '#CD0100'
      },
      height: {
        16: '16.125rem'
      },
      maxWidth: {
        16: '16.25rem'
      },
      width: {
        16: '16.25rem',
        27: '27rem'
      }
    },
    fontFamily: {
      inter: ['Inter']
    }
  },
  plugins: []
} satisfies Config;
