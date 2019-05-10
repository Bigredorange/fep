/**
 * 获取项目配置文件
 */

const fs = require('fs');
const path = require('path');

module.exports = () => {
  const projectConfigPath = path.join(__dirname, '../../../../project/config.json');
  const isExist = fs.existsSync(projectConfigPath);
  if (isExist) {
    const projectConfig = require(projectConfigPath);
    return projectConfig;
  } else {
    console.log('无法找到项目配置文件');
    return;
  }
};
