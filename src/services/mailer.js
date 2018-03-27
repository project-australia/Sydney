const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: 'hebert@feracode.com',
    pass: 'feracode123!!'
  }
})

const sendMail = async (to, subject, text, html) => {
  const mailOptions = {
    from: '"Ballard Books" <hebert@feracode.com>',
    to,
    subject,
    text,
    html
  }

  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // TODO: Should we throw an error? or don't sending email doesnt mean an error
      console.log(error)
    }
  })
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
