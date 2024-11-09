/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2B85FF",
        secondary: "#EF863E",
        tertiary: "#6d28db",
        background: "#1f1d2b",
        lightPurple: "#aa9de7",
        navbg: "#0f131b",
        blackbg: "#020711",
        lightGray: "#d2d3d5",
      },
      fontFamily: {
        'fraunces': ["Fraunces"],
      }
    },
  },
  plugins: [],
}