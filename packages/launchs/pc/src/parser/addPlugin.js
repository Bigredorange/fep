module.exports = function (config, option) {
  const webpack = require('webpack')
  const path = require('path');
  const CleanWebpackPlugin = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const DllReferencePlugin = this.plugin.linkDllReference
  // const LoadCDNPlugin = this.plugin.loadCDNPlugin
  const VueLoaderPlugin = require('vue-loader/lib/plugin')
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
  const CopyWebpackPlugin = require('copy-webpack-plugin');
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
  const StylelintWebpackPlugin = require('stylelint-webpack-plugin');

  const {
    clean,
    copy,
    dist,
    minimize,
    provide,
    template,
    analysis,
    dll,
    dllReference,
    stylelint
  } = option

  // vue-loader插件
  config.plugins.push(new VueLoaderPlugin());

  // 清空
  if (clean) {
    config.plugins.push(new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: dist,
    }))
  }

  // html模版
  if (template) {
    /**
     * template：html文件的配置
     * @param favicon {String} 图标路径
     * @param template {String} 模板文件路径
     * @param filename {String} 文件名
     * @param chunks {Array} 包含的代码分割块
     */
    const rs = typeof template
    if (Array.isArray(template)) {
      template.forEach((item) => {
        config.plugins.push(new HtmlWebpackPlugin({
          chunksSortMode: 'manual',
          inject: true,
          minify: minimize ? {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
          } : {},
          ...item,
        }))
      })
    } else if (rs === 'object') {
      config.plugins.push(new HtmlWebpackPlugin({
        chunksSortMode: 'manual',
        inject: true,
        minify: minimize ? {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
        } : {},
        ...template,
      }))
    }
  }

  // dll plugin
  if (dll) {
    config.plugins.push(new webpack.DllPlugin({
      context: '.',
      name: 'dll',
      path: `dist/[name].json`,
      ...dll
    }))
  }

  // dllReference plugin
  if (dllReference) {
      config.plugins.push(new DllReferencePlugin({
          context: '.',
          ...dllReference
      }))
  }

  // 加载cdn脚本插件
  // config.plugins.push(new LoadCDNPlugin())

  // 全局
  if (provide) {
    config.plugins.push(new webpack.ProvidePlugin(provide))
  }

  // 代码压缩
  if (minimize) {
    // 样式
    config.plugins.push(new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:7].css',
      chunkFilename: 'css/[id].[hash:7].css',
    }));
    // 脚本
    config.plugins.push(new UglifyJsPlugin({
      uglifyOptions: {
        warnings: false,
        output: {
          comments: false,
          beautify: false,
        },
      },
      sourceMap: false, // 后期做监控用到
      parallel: true // 多线程执行
    }));
  }

  if (copy) {
    /**
     * 复制文件
     */
    const copys = Array.isArray(copy) ? copy : [copy];
    config.plugins.push(new CopyWebpackPlugin(copys));
  }
  
  if (analysis) {
    // TODO: 打包分析(目前只支持单个页面的)
    config.plugins.push(new BundleAnalyzerPlugin({
      analyzerPort: 200,
    }));
  }

  // TODO: assetsPath
  // TODO: sourceMap

  if (stylelint) {
    config.plugins.push(new StylelintWebpackPlugin({
      context: path.join(process.cwd(), '../'),
      configFile: path.join(__dirname, './loader/stylelint.config.js'),
    }));
  }
}