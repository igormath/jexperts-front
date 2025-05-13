/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        backgroundColor: theme => ({
            ...theme('colors'),
            'primary': '#EFAC41',
            'secondary': '#E5F3BA',
            'button-color': '#b32900',
            'card': '#ECFAC0',
            'white-card': '#FAFAFA'
          }),
          textColor: {
            'primary': '#F0F0F0',
            'title': '#330a04',
            'subtitle': '#6c1305',
            'button': '#E5F3BA',
            'link': '#1e293b',
            'link-primary': '#2545e1',
            'link-secondary': '#5b73e5',
            'alert': '#e22449',
          },
      extend: {
        fontFamily: {
            'roboto': ['"Roboto"', 'sans-serif'],
        }
      },
    },
    plugins: [],
  }
