const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,json}"],
  darkMode: "class",
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
            `hsla(235, 19%, 35%, ${opacityValue})`,
        },
        dark: {
          blue: "hsl(235, 21%, 11%)",
          "desaturated-blue": "hsl(235, 24%, 19%)",
          "light-grayish-blue": "hsl(234, 39%, 85%)",
          "grayish-blue": "hsl(234, 11%, 52%)",
          "very-grayish-blue": "hsl(233, 14%, 35%)",
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
