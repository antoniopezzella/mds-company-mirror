export default {
  plugins: {
    // Tailwind v4 ships its own PostCSS plugin and handles @import inlining
    // and vendor prefixing internally, so postcss-import and autoprefixer are
    // no longer wired here.
    '@tailwindcss/postcss': {},
  },
};
