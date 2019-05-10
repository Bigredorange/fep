const webpack = require('webpack');

module.exports = (config) => {
  return new Promise((resolve, reject) => {
    console.time('编译时间');
    webpack(config).run((err, stats) => {
      if (err) {
        console.log(err)
        process.exit(1)
      }
      const jsonStats = stats.toJson()
      if (jsonStats.errors.length > 0) {
        console.log(jsonStats.errors)
        process.exit(1)
      }
      if (jsonStats.warnings.length > 0) {
        console.log(jsonStats.warnings)
      }
      console.log(stats.toString({
        builtAt: false,
        timings: false,
        hash: false,
        version: false,
        modules: false,
        moduleTrace: false,
        chunks: false, // Makes the build much quieter
        colors: true
      }))
      console.timeEnd('编译时间');
      resolve('编译成功');
    })
  })
}