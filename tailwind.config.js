/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette — green=primary, yellow=accent, blue=action
        brand: {
          green: '#16a34a',
          'green-light': '#bbf7d0',
          'green-dark': '#14532d',
          yellow: '#eab308',
          'yellow-light': '#fef9c3',
          blue: '#3b82f6',
          'blue-light': '#dbeafe',
        },
      },
      fontFamily: {
        // Include Devanagari-friendly font
        sans: ['Noto Sans', 'Noto Sans Devanagari', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        card: '0 4px 20px rgba(0,0,0,0.08)',
        button: '0 4px 12px rgba(22,163,74,0.3)',
      },
      // Minimum touch target: 48px
      minHeight: { touch: '48px' },
      minWidth: { touch: '48px' },
    },
  },
  plugins: [],
};
