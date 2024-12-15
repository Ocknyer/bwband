import type { Config } from 'tailwindcss';

const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
  important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#060507',
      },
      fontFamily: {
        capsSmall: ['var(--font-capsmall)'],
        blackHanSans: ['Black Han Sans'],
        nanumMyeongjo: ['var(--font-nanumMyeongjo)'],
        hsbombaram: ['HSBombaram'],
        gongGothicMedium: ['GongGothicMedium'],
      },
      transformOrigin: {
        'origin-center': 'center',
      },
    },
    screens: {
      // xs: { max: '300px' },
      // ...defaultTheme.screens,
      xxs: '280px',
      xs: '320px',
      sm: '768px',
      md: '1024px',
      lg: '1280px',
      xl: '1440px',
      '2xl': '1536px',
    },
  },
  plugins: [],
};
export default config;
