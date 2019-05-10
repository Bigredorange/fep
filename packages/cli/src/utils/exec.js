const { execSync } = require('child_process');

module.exports = (command, options = {}) => {
  try {
    execSync(command, {
      maxBuffer: 200 * 1024 * 1024,
      stdio: 'inherit',
      ...options,
    })
  } catch (error) {
    process.exit(1);
  }
};
