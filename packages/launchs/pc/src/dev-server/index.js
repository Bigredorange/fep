/**
 * webpack-dev-Server解析
 */

const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const WebpackDevServer = require('webpack-dev-server/lib/Server');
const ipAddress = require('./getIPAddress')()
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = (webpackConfig, option = {}) => {
  const serverOption = {
    devtool: 'cheap-module-eval-source-map',
    watch: true,
    devServer: {
      host: '0.0.0.0',
      port: 100,
      contentBase: './dist',
      compress: true,
      hot: true,
      quiet: true,
    },
    watchOptions: {
      ignored: [/node_modules/],
      aggregateTimeout: 3e2, // 合并变更重新编译间隔
      poll: 1e3, // 轮询间隔
    },
    stats: {
      assets: false,
      hash: false,
      version: false,
      modules: false,
      chunks: false, // Makes the build much quieter
      colors: true
    },
    historyApiFallback: false,
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
    ...option,
  };
  const { devServer, otherWebpackConfig } = serverOption;

  if (!Array.isArray(webpackConfig)) {
    webpackConfig = [webpackConfig]
  }

  console.log(`编译中，本地访问地址 http://${ipAddress}:${serverOption.devServer.port}`)

  const webpack_socket_entry = path.resolve(__dirname, '../../node_modules/webpack-dev-server/client/index.js')

  webpackConfig = webpackConfig.map((config, index) => {
    if (!option.singleSocket || index === 0) {
      Object.keys(config.entry).forEach((name) => {
        config.entry[name] = [
          `${webpack_socket_entry}?http://0.0.0.0:${serverOption.devServer.port}/`,
          ...config.entry[name],
        ];
        config.plugins.push(new friendlyErrorsWebpackPlugin());
      });
    }
    const result = merge(config, otherWebpackConfig);
    return result;
  });

  WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServer); // hot-reload
  return new WebpackDevServer(webpack(webpackConfig), devServer).listen(serverOption.devServer.port, '0.0.0.0', () => {})
}
