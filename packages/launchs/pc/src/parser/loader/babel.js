const path = require('path')

module.exports = {
  loader: 'babel-loader',
  options: {
    configFile: path.join(__dirname, './babel.config.js'),
  },
}