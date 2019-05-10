
module.exports = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: [
      require('autoprefixer')({
        browsers: ['last 2 versions', 'ie >= 10'],
      }),
      require('postcss-import')({}),
      require('postcss-url')({}),
    ],
  },
}