const { execSync } = require('child_process');
const path = require('path');
const command = process.argv[2];

// 装根目录包
execSync('yarn', {
  maxBuffer: 200 * 1024 * 1024,
  stdio: 'inherit',
});
// 装包
execSync('yarn bootstrap', {
  maxBuffer: 200 * 1024 * 1024,
  stdio: 'inherit',
});
// 执行cli的指令
execSync(`yarn start ${command || ''}`, {
  cwd: path.join(__dirname, 'packages/cli'),
  maxBuffer: 200 * 1024 * 1024,
  stdio: 'inherit',
});
