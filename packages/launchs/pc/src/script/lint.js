/**
 * 代码校验
 * TODO: 目前只校验project下的项目
 */

const eslint = require('eslint');
const path = require('path');

const cliEngine = new eslint.CLIEngine({
  fix: true,
  useEslintrc: false,
  configFile: path.join(__dirname, '../parser/loader/eslint.config.js'),
  extensions: ['.vue'],
  ignorePattern: /node_modules/,
})
try {
  const report = cliEngine.executeOnFiles([path.join(__dirname, '../../../../projects/project/')]);
  eslint.CLIEngine.outputFixes(report);
} catch (error) {
  console.log(error);
}
