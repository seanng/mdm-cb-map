const {
  SWIPER_SHOWCASE_HEIGHT,
  SWIPER_SHOWCASE_WIDTH,
} = require('./constants/metrics')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{tsx,jsx}',
    './components/**/*.{tsx,jsx}',
    './pages/**/*.{tsx,jsx}',
  ],
  theme: {
    extend: {
      // Overriding fontFamily to use @next/font loaded families
      fontFamily: {
        sans: 'var(--font-sans)',
      },
      screens: {
        xl: '1200px',
        '2xl': '1600px',
      },
      spacing: {
        'navbar-height': '46px',
        'swiper-showcase-height': `${SWIPER_SHOWCASE_HEIGHT}px`,
        'swiper-showcase-width': `${SWIPER_SHOWCASE_WIDTH}px`,
      },
      zIndex: {
        navigation: 100,
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}
