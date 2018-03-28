const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// const msg = {
//   to: 'test@example.com',
//   from: 'test@example.com',
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>'
// }

const sendMail = async (to, subject, text, html) => {
  const mailOptions = {
    from: '"Ballard Books" <ballardbooks@feracode.com>',
    to,
    subject,
    text,
    html
  }
  return sgMail.send(mailOptions)
}

const sendShippingLabelTo = async (to, label) => {
  const subject = 'Your Shipping Label is HERE'
  const text = label
  const html = `<h1> ${label} </h1>`
  return sendMail(to, subject, text, html)
}

const sendOrderConfirmationEmailTo = async (to, order) => {
  const subject = 'Order Confirmation'
  const text = JSON.stringify(order)
  const html = `<h1> ${JSON.stringify(order)} </h1>`
  return sendMail(to, subject, text, html)
}

module.exports = {
  sendShippingLabelTo,
  sendOrderConfirmationEmailTo
}
