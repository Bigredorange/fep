/*
 * 获取命令行参数
 */
const commander = require('commander');

module.exports = () => {
  // 读取命令配置
  const argv = commander
    .option('--projects [projects]', 'Add projects')
    .parse(process.argv);
  return argv;
};
