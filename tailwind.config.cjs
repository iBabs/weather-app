/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
     screens:{
      sm: '480px',
      md: '768px',
      lg: '984px',
      xl: '1440px'
    },
    extend: {
      colors:{
        darkblue: '#030521',
        borderGrey:'#8e8f99',
        playBlue: '#06367d'
      },
      backgroundImage: {
        'snow': "url('./src/assets/snow.jpg')",
        'raining': "url('./src/assets/raining.jpg')",
        'haze': "url('./src/assets/haze.jpg')",
        'sunny': "url('./src/assets/sunny.jpg')",
        'storm': "url('./src/assets/thunderstorm.jpg')",

      }
    },
  },
  plugins: [],
}
