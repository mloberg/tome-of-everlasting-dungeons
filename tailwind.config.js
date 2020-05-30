module.exports = {
  purge: [
    "./**/*.html",
    "./**/*.md",
    "./_assets/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        "display": ["Oswald", "sans-serif"],
        "body": ["Open\ Sans", "sans-serif"],
      },
      zIndex: {
        "-1": "-1",
      },
    },
  },
  variants: {},
  plugins: [
    require("@tailwindcss/custom-forms"),
  ],
}
