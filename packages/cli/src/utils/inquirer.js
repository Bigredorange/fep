/**
 * 命令行交互
 */

const inquirer = require('inquirer');
const getProjects = require('./getProjects');
const projectNames = getProjects();

const action = () => new Promise((resolve) => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: '请选择你要执行的操作：',
      choices: [
        {
          name: '开发',
          value: 'dev',
        },
        {
          name: '下载依赖包',
          value: 'yarn',
        },
        {
          name: '打包',
          value: 'build',
        },
      ],
    },
  ]).then(answer => resolve(answer.action));
});

const selectProject = (type = 'list') => new Promise((resolve) => {
  if (type === 'all') {
    resolve(projectNames);
  } else {
    // TODO: 暂不支持单个系统打包
    inquirer.prompt([
      {
        type,
        name: 'projectNames',
        message: '请选择要执行的项目：',
        choices: projectNames,
        validate: (answers) => {
          if (answers.length) return true;
          return '至少选择一个项目';
        },
      },
    ]).then(answers => resolve(answers.projectNames));
  }
});

module.exports = {
  action,
  selectProject,
};
