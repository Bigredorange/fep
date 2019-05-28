const addEntry = require('./addEntry')
const addModule = require('./addModule')
const addPlugin = require('./addPlugin')
const addOutput = require('./addOutput')
const addExternals = require('./addExternals')
const addResolve = require('./addResolve')
const addMode = require('./addMode')
const addOptimization = require('./addOptimization')
const loader = require('./loader')
const plugin = require('./plugin')
const path = require('path')

const defaultOption = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/index.js', // 打包入口
  dist: path.join(process.cwd(), 'dist'), // 输出目录
  template: false, // html模板
  publicPath: '/', // 同output.publicPath，公共路径
  // assetsPath: process.env.NODE_ENV === 'production' ? '' : 'static/', // 相对于dist的子目录，图片、字体文件的存放路径
  urlLoaderLimit: 10e3, // 图片、字体等资源文件小于多少时（单位 Byte）内嵌在 JS 或 CSS 中
  clean: process.env.NODE_ENV === 'production', // 是否清空之前的输出目录
  hash: process.env.NODE_ENV === 'production', // 输出文件名是否带 7 位的长度 hash 值
  chunkhash: process.env.NODE_ENV === 'production', // 输出文件名是否带 7 位的长度 hash 值
  // sourceMap: false, // 构建后的文件带 sourceMap
  minimize: process.env.NODE_ENV === 'production', // 是否启动压缩
  library: '', // 同output.library
  libraryTarget: 'umd', // 同output.libraryTarget
  externals: {}, // 不需要打包的模块
  provide: { // 自动加载模块
    Vue: 'vue',
  },
  alias: { // 同resolve.alias
    vue: 'vue/dist/vue.common.js'
  },
  dll: false,
  dllReference: false,
  copy: false, // 复制文件
  analysis: process.env.ANALYSIS === 'true', // 是否分析打包文件
  optimization: {}, // 代码分割
  loader: {
    babel: {},
    css: {},
    html: {},
    icon: {},
    md: {},
    sass: {},
    sassResources: false, // 默认不开启
    style: {},
    url: {},
    vue: {}
  },
  extension: {
    html: {},
    scss: {},
    css: {},
    vue: {},
    js: {},
    md: {},
    icon: {},
    svg: {},
    eot: {},
    ttf: {},
    gif: {},
    jpg: {},
    swf: {},
    png: {},
    woff: {}
  },
  eslint: true, // js校验
  stylelint: false, // TODO: css校验
}

const getOption = (option) => {
  const rs = {
    ...defaultOption,
    ...option
  }

  // 浅拷贝只到一层对象属性，二层对象属性需要再次拷贝
  rs.alias = {
    ...defaultOption.alias,
    ...option.alias
  }
  rs.externals = {
    ...defaultOption.externals,
    ...option.externals
  }
  rs.extension = {
    ...defaultOption.extension,
    ...option.extension
  }
  rs.provide = {
    ...defaultOption.provide,
    ...option.provide
  }
  rs.loader = {
    ...defaultOption.loader,
    ...option.loader
  }

  return rs
}

const parser = function (option = {}) {
  if (Array.isArray(option)) {
    return option.reduce((arr, item) => {
      return arr.concat(parser(item))
    }, [])
  }

  const webpackConfig = {
    mode: '',
    entry: {},
    output: {},
    externals: {},
    resolve: {},
    module: {
      rules: []
    },
    resolveLoader: {
      modules: [
        path.resolve(__dirname, '../../node_modules'),
        path.resolve(process.cwd(), './node_modules'),
        'node_modules'
      ]
    },
    plugins: [],
    // https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
    optimization: {
      splitChunks: false,
      runtimeChunk: false
    },
    performance: {
      hints: false
    }
  }

  option = getOption(option)

  const bind = {
    loader,
    plugin
  }

  addMode.call(bind, webpackConfig, option)
  addEntry.call(bind, webpackConfig, option)
  addOutput.call(bind, webpackConfig, option)
  addModule.call(bind, webpackConfig, option)
  addOptimization.call(bind, webpackConfig, option)
  addExternals.call(bind, webpackConfig, option)
  addResolve.call(bind, webpackConfig, option)
  addPlugin.call(bind, webpackConfig, option)

  return [webpackConfig]
}

module.exports = {
  parser,
  loader,
  plugin
}