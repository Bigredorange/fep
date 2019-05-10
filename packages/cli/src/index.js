/**
 * cli主入口
 */

// // const tools = require('@fep/tools');
// const inquirer = require('./utils/inquirer');
const build = require('./script/build');
const dev = require('./script/dev');
const lint = require('./script/lint');

(async () => {
  let action = process.argv[2];
  if (action === 'dev') {
    /* 开发环境 */
    // const projectPath = await inquirer.selectProject('all');
    // dev(projectPath);
    dev('@fep-project/bootstrap');
  } else if (action === 'build' || action === 'analysis') {
    /* 生产环境 */
    // const projectPath = await inquirer.selectProject('all');
    // build(projectPath, action);
    build('@fep-project/bootstrap');
  } else if (action === 'release') {
    /* 生成版本日志并发送邮箱 */
    // await tools.sendReleaseNote();
  } else if (action === 'lint') {
    lint();
  } else if (action === 'test') {
    /* 测试 */
    // const projectPath = await inquirer.selectProject('checkbox');
    dev(projectPath);
  }
})();
