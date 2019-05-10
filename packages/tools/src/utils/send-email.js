/**
 * 发送邮件
 * @参考: https://nodemailer.com/message/
 */

const nodemailer = require('nodemailer')
const cfg = require('../../config.json')

const smtp_transporter = nodemailer.createTransport({
  host: cfg.smtp.host,
  port: cfg.smtp.port,
  secure: cfg.smtp.port == 465,
  auth: {
    user: cfg.smtp.sender.user,
    pass: cfg.smtp.sender.pass
  }
})
const sendEmail = (mailOptions) => {
  const from = `前端组 <${cfg.smtp.sender.user}>`
  return new Promise((resolve, reject) => {
    smtp_transporter.sendMail(Object.assign(mailOptions, {
      from,
      to: cfg.smtp.receiver.to,
      cc: cfg.smtp.receiver.cc,
    }), (err, res) => {
      if (err) return reject(err)
      resolve()
      smtp_transporter.close()
    })
  })
}

module.exports = sendEmail;
