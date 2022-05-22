const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,json}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Josefin Sans"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "check-start": ({ opacityValue }) =>
          `hsla(192, 100%, 67%, ${opacityValue ?? 100})`,
        "check-stop": ({ opacityValue }) =>
          `hsla(280, 87%, 65%, ${opacityValue ?? 100})`,
        primary: {
          DEFAULT: ({ opacityValue }) => `hsla(220, 98%, 61%, ${opacityValue})`,
        },
        light: {
          gray: ({ opacityValue }) => `hsla(0, 0%, 98%, ${opacityValue})`,
          "very-grayish-blue": ({ opacityValue }) =>
            `hsla(236, 33%, 92%, ${opacityValue})`,
          "grayish-blue": ({ opacityValue }) =>
            `hsla(233, 11%, 84%, ${opacityValue})`,
          "dark-grayish-blue": ({ opacityValue }) =>
            `hsla(236, 9%, 61%, ${opacityValue})`,
          "very-dark-grayish-blue": ({ opacityValue }) =>
            `hsla235, 19%, 35%, ${opacityValue})`,
        },

        // dark: {}
      },
      boxShadow: {
        checkbox: "inset 1em 1em white",
      },
      letterSpacing: {
        "more-wide": "0.2em",
      },
      screens: {
        mobile: "375px",
        desktop: "1440px",
      },
      fontSize: {
        regular: "1.125rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    // require("@tailwindcss/forms")
  ],
};
