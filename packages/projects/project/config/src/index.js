const config = require('./config.json');

let pageLink = '';
if (typeof window !== 'undefined') {
  const {
    protocol,
    host,
  } = window.location;
  pageLink = `${protocol}//${host}`;
}

module.exports = {
  ...config,
  // 跳转链接
  entryLink: !config.entryOutputPublicPath ? pageLink : `${pageLink}/${config.entryOutputPublicPath}/#`, // 总登录入口地址
  // api
  baseURL: config.baseURL,
  // TODO: 后期移除
  downLoadURL: `${config.baseURL}/api/finance-service/files/downLoadFile`,
  // socket
  messageSocket: `${config.messageSocket}/websocket`,
};
