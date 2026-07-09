/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sakhi: {
          // Strict Background Colors
          bg: {
            primary: '#FFF8F6',
            secondary: '#FFF3F8',
            section: '#FFF9EC',
            card: '#FFF6FB',
            alt: '#F7FCF6'
          },
          // Strict Accent Colors
          coral: '#FF8A80',
          peach: '#FFB68A',
          pink: '#FFB3D9',
          rose: '#F48FB1',
          lavender: '#C9B6FF',
          lilac: '#D9C7FF',
          sky: '#AEE7FF',
          mint: '#B9F4D0',
          sage: '#CDECCF',
          yellow: '#FFE79A',
          orange: '#FFD59A',
          // Strict Typography Colors
          text: {
            primary: '#5E5A66',
            secondary: '#7E7A88',
            muted: '#A09BAA'
          }
        }
      },
      borderRadius: {
        '2xl': '18px',
        '3xl': '24px'
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Outfit', 'sans-serif']
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(223, 196, 196, 0.15)',
        'glass-hover': '0 12px 40px 0 rgba(223, 196, 196, 0.25)'
      }
    },
  },
  plugins: [],
}
