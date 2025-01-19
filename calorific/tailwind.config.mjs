/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'theme-orange'                    : '#F5853F',
        'light-orange'                    : '#F9BB78',
        'white'                           : '#ffffff',
        'black'                           : '#000000',
        'placeholder-color-1'             : '#ff29a2',
        'placeholder-color-2'             : '#1226ff',
        'placeholder-background-1'        : '#00ff2f',
        'placeholder-background-2'        : '#eeff00',
        'cream-white'                     : '#FFF8F0',
        'dark-bleu'                       : '#141F39',
      },
    },
  },
  plugins: [],
};
