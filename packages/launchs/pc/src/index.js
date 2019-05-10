const devServer = require('./dev-server');
const { parser } = require('./parser');
const compile = require('./compile');
const lint = require('./script/lint');

module.exports = {
  set(option) { // 编译配置
    this._webpackConfig = parser(option)// 将配置解析为webpack原始配置
    return this;
  },
  dev(option) { // 启动webpack-dev-server本地服务
    devServer(this._webpackConfig, option);
  },
  build() {
    // console.log(this._webpackConfig)
    return compile(this._webpackConfig);
  },
  lint() {
    lint();
  },
};
