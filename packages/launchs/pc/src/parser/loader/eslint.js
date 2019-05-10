const path = require('path');

module.exports = {
  loader: 'eslint-loader',
  options: {
    enforce: 'pre',
    formatter: require('eslint-friendly-formatter'),
    emitWarning: true,
    configFile: path.join(__dirname, './eslint.config.js'),
  }
}
