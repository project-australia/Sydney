const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendMail = async (to, subject, html, text) => {
  const mailOptions = {
    from: '"Ballard Books" <ballardbooks@feracode.com>',
    to,
    subject,
    text,
    html
  }

  return sgMail.send(mailOptions)
}

const sendMailWithCC = async (to, subject, html, text, cc) => {
  const mailOptions = {
    from: '"Ballard Books" <ballardbooks@feracode.com>',
    cc,
    to,
    subject,
    text,
    html
  }

  return sgMail.send(mailOptions)
}

module.exports = {
  sendMail,
  sendMailWithCC
}
