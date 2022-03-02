module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        danger: "#ed254e",

        olive: {
          50: "#daded7",
          100: "#b5bdb0",
          200: "#a2ac9c",
          300: "#8f9b88",
          400: "#7d8b74",
          500: "#6a7a61",
          600: "#586a4d",
          700: "#455939",
          800: "#3e5033",
          900: "#303e28",
        },
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      screens: {
        sx: "480px",
        sxx: "300px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
