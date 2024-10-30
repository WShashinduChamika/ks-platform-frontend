/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary":"#1F8DED",
        "dropdown-bg":"#D7E7FF",
        "course-btn1-bg":"#E4F2FF",
        "course-btn2-bg":"#FAC00D"
      }
    },
  },
  plugins: [],
}

