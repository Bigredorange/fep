/**
 * 执行代码校验
 * TODO: 目前只校验project下的项目
 */

const exec = require('../utils/exec');
const tools = require('@fep/tools');

module.exports = (project) => {
  console.log('开始进行代码校验');
  exec(`lerna exec yarn lint --scope @fep/launchs-pc`, {
    cwd: tools.dirs.rootDir,
  });
};
