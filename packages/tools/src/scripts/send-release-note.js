/**
 * 生成版本日志并发送
 */

const sendEmail = require('../utils/send-email');
const genReleaseNote = require('../utils/gen-release-note');
const mdToHtml = require('../utils/md-to-html');
const getProjectConfig = require('../utils/get-project-config');
const projectConfig = getProjectConfig();
let { name, envName } = projectConfig.system;
envName = envName ? `(${envName})` : '';
const { VERSION } = process.env;

module.exports = async () => {
  const { filePath } = await genReleaseNote();
  if (!VERSION || !projectConfig) return;
  const html = mdToHtml(filePath);
  const emailOptions = Object.assign({
    subject: `${name}${envName}${VERSION}发布成功`,
    html,
  });
  await sendEmail(emailOptions);
  console.log('已发送版本邮件');
}
