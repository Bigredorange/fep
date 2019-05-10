/**
 * 根据要求生成markdown文件
 */

const marked = require('marked');
const fs = require('fs');

module.exports = (path) => {
  let md = fs.readFileSync(path, { encoding: 'utf-8' });
  md = md
    .replace(/Bug Fixes/, '问题修复')
    .replace(/Features/, '新特性')
    .replace(/Performance Improvements/, '性能优化')
    .replace(/Reverts/, '其它') // 原意是回退，但这里用于记录无关紧要的信息
  return marked(md);
}