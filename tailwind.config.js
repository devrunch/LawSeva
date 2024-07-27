/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#EE7F50",
        primary2:"#FFC0A5",
        secondary:"#31A6C7",
        secondaryhover:"#2786a1",
        background:"#EFF4FC",
        paragraph:"#7F8490",
      },
      fontFamily:{
        manrope:"Manrope",
        ubuntu:"Ubuntu",
        dmsans:"DM Sans",
      }
    },
  },
  plugins: [],
}