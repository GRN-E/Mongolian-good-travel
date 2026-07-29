/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      xs: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        brand: {
          blue: '#1735C8',
          'blue-deep': '#0A1854',
          'blue-soft': '#EEF1FA',
          red: '#E5331F',
          'red-soft': '#FCE9E6',
        },
        sun: '#F59E0B',
        'sun-soft': '#FEF3C7',
        sky: '#0EA5E9',
        'sky-soft': '#E0F2FE',
        steppe: '#15803D',
        'steppe-soft': '#DCFCE7',
        clay: '#C2410C',
        'clay-soft': '#FFEDD5',
        plum: '#7C2D92',
        'plum-soft': '#F3E8FF',
        ink: '#0A1854',
        'ink-2': '#4B5563',
        bone: '#FAFAF7',
        cream: '#FEF7E7',
        line: '#E5E7EB',
      },
      fontFamily: {
        display: ['Onest', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Onest', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        crunched: '-0.05em',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(10,24,84,0.04), 0 8px 24px -8px rgba(10,24,84,0.08)',
        'card-hover': '0 4px 8px rgba(10,24,84,0.06), 0 24px 48px -12px rgba(10,24,84,0.18)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 36s linear infinite',
      },
    },
  },
  plugins: [],
}
