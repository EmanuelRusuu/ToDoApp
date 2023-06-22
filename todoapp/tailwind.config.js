/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      screens: {
        xsm: '480px'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        neue: ['Neue Hass Grotesk Display Pro']
      }
    }
  },
  plugins: []
}
