module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito Sans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },

  plugins: [require('daisyui'), require('@tailwindcss/line-clamp')],
  daisyui: {
    themes: [
      {
        dark: {
          primary: '#11468F',
          secondary: '#F9F9FB',
          accent: '#0E86D4',
          neutral: '#191D24',
          'base-100': '#2A303C',
          info: '#F9F9FB',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
        light: {
          primary: '#11468F',
          secondary: '#2A303C',
          accent: '#0E86D4',
          neutral: '#191D24',
          'base-100': '#F9F9FB',
          info: '#2A303C',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
  },
};
