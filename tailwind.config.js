module.exports = {
  content: [
    './_assets/**/*.js',
    // https://tailwindcss.com/docs/content-configuration#styles-rebuild-in-an-infinite-loop
    './_includes/**/*.{html,svg}',
    './_layouts/**/*.html',
    './api/**/*.html',
    './tools/**/*.html',
    './index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
