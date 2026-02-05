/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './composables/**/*.{js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#B2DF28',
          dark: '#7AB82E',
          light: '#B8E986'
        },
        dark: {
          900: '#0E0E0E',
          800: '#121212',
          700: '#1a1a1a',
          600: '#242424',
          500: '#2C2E30',
          400: '#3B3D3F'
        },
        status: {
          alive: '#00FF80',
          dead: '#FF1E00',
          unknown: '#95A5A6'
        },
        episode: {
          DEFAULT: '#0AD7F1',
          background: '#0AD7F10A'
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
