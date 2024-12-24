/** @type {import('tailwindcss').Config} */
export default {
  content: [ 
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    container:{
      center:true,
      screens:{
        'sm': '600px',
      'md': '728px',
      'lg': '960px',
      'xl': '1220px',
      '2xl': '1380px',
          }
    },
    extend: {
      colors:{
        primary:"#0aad0a"
      },
      fontFamily:{
        cairo:"Cairo Variable"
      },
      animation: {
        wobble: 'wobble 1s ease-in-out infinite ',
      },
      keyframes: {
        wobble: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-10px)' },
          '75%': { transform: 'translateX(10px)' },
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

