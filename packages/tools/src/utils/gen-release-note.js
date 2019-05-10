/**
 * 生成版本日志
 */

const version = process.env.VERSION;
const cc = require('conventional-changelog');
const path = require('path');

module.exports = () => new Promise((resolve, reject) => {
  const filePath = path.join(__dirname, `../../RELEASE_NOTE${version ? `_${version}` : ``}.md`);
  const fileStream = require('fs').createWriteStream(filePath);
  cc({
    preset: 'angular',
    pkg: {
      transform (pkg) {
        if (version) {
          pkg.version = `v${version}`;
        }
        return pkg;
      },
    },
  }).pipe(fileStream).on('close', () => {
    console.log(`已生成版本日志 ${filePath}`);
    resolve({
      filePath,
    });
  });
});
