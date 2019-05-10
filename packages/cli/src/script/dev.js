/**
 * 运行开发环境
 */

const exec = require('../utils/exec');
const tools = require('@fep/tools');

module.exports = (project) => {
  console.log('开始启动项目');
  exec(`lerna exec yarn dev --scope ${project}`, {
    cwd: tools.dirs.rootDir,
  });
};
