const fs= require('fs');
const path = require('path');
const nodeModules = path.join(__dirname, '../node_modules');

module.exports = () => {
  const deps = fs.readdirSync(path.join(nodeModules, '@fep-project')).map(name => `@fep-project/${name}`);
  deps.forEach(dep => {
    // 检查.fep是否存在
    const hroDir = path.join(nodeModules, dep, '.fep');
    if (!fs.existsSync(hroDir)) {
      fs.mkdirSync(hroDir);
    }

    // 获取模块下的.fep/server.config.json是否是运行时
    const serverConfigPath = path.join(nodeModules, dep, '.fep/server.config.json');
    if (!fs.existsSync(serverConfigPath)) {
      fs.writeFileSync(serverConfigPath, '{ "runtime": true }');
    }
    const serverConfig = require(serverConfigPath);

    // 将模块入口文件写入.fep/bootstrap.js
    const bootstrapPath = path.join(hroDir, 'bootstrap.js');
    if (process.env.NODE_ENV === 'production' || serverConfig.runtime) {
      fs.writeFileSync(bootstrapPath, 'module.exports = require("../src/index.js");');
    } else {
      fs.writeFileSync(bootstrapPath, 'module.exports = require("../dist/index.js");');
    }
  });

  // TEMP：CBAS、CRM统一后后期开放
  // // 生成主入口index.js初始化文件
  // const subModules = deps.filter(dep => /@fep-project\/v-/.test(dep)).map((dep) => {
  //   const name = dep.match(/@fep-project\/v-(.+)/)[1];
  //   return `${name}: require("${dep}")`;
  // }).join(',\n');
  // fs.writeFileSync(path.join(__dirname, '../src/index.js'), `
  //   require('@fep-project/core').init({
  //     ${subModules}
  //   });
  // `);
  return deps;
}