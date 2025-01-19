/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        fadeOut: 'fadeOut 2s ease-in-out',
      },
      keyframes: {
        fadeOut: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
    colors: {
      'theme-orange'                    : '#F5853F',
      'white'                           : '#ffffff',
      'black'                           : '#000000',
      'placeholder-color-1'             : '#ff29a2',
      'placeholder-color-2'             : '#1226ff',
      'placeholder-background-1'        : '#00ff2f',
      'placeholder-background-2'        : '#eeff00',

    }
  },
  plugins: []
}

