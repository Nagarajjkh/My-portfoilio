/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          base: '#08080a',
          surface: '#111114',
          raised: '#17171b',
        },
        bone: {
          DEFAULT: '#f3f1ea',
          muted: '#807f78',
        },
        ember: {
          DEFAULT: '#ff3b1d',
          soft: '#ff6a3d',
        },
        hair: 'rgba(243,241,234,0.1)',
      },
      fontFamily: {
        display: ['Anton', 'system-ui', 'sans-serif'],
        body: ['Onest', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      maxWidth: {
        shell: '1440px',
      },
    },
  },
  plugins: [],
};
