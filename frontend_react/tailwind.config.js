/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "primary-orange": "#FF5722",
      },
      boxShadow: {
        btn: "inset 10px -50px 94px 0 rgb(199, 199, 199, 0.2)",
      },
      width: {
        "max-content": "max-content",
      },
    },
  },
  plugins: [],
};
