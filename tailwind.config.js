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

  plugins: [require('daisyui')],
  daisyui: {
    themes: ['corporate', 'night'],
  },
};
