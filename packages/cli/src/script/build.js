/**
 * 打包项目
 */

const exec = require('../utils/exec');

module.exports = (project) => {
  console.log('正在打包中，请稍候...');
  console.time('打包时间');
  exec(`npx lerna exec yarn build --scope ${project}`);
  console.timeEnd('打包时间');
};
