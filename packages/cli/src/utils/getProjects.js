/**
 * 获取项目目录
 */

const tools = require('@fep/tools');
const fs = require('fs');

module.exports = () => {
  const { projectDir } = tools.dirs;
  const projectsNames = fs.readdirSync(projectDir).filter(name => !/\./.test(name)).filter(name => !/common|node_modules|dist/.test(name));
  return projectsNames;
};
