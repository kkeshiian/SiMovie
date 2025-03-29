/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"], // Sesuaikan dengan path file proyek
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"Poppins"', "sans-serif"],
        secular: ['"Secular One"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
