module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [
    './**/*.html',
  ],
  theme: {
    extend: {},
  },
  variants: {
    height: ['responsive', 'hover', 'focus'],
  },
  plugins: [],
}
