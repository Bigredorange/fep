const path = require('path')

module.exports = function (config, option) {
  const alias = option.alias
  const resolve = {
    modules: [
      path.resolve(__dirname, '../../node_modules'),
      path.resolve(process.cwd(), './node_modules'),
      'node_modules'
    ],
    extensions: ['.js', '.ts', '.vue', '.json', 'scss'],
  }

  if (alias) {
    resolve.alias = alias
  }

  config.resolve = resolve
}