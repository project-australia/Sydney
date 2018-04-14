const {
  OrderEmailTemplateBuilder
} = require('../builders/orderEmailTemplateBuilder')
const { sendMail } = require('../../data/vendors/sendgrid')

const BALLARD_EMAIL = 'info@ballardbooks.com'

const sendBeARepresentantRequest = async user => {
  const html = `
  <p><b>${user.name}</b> wants to be an representant</p>
  <p>his/her email address is: ${user.email}.</p>
  `
  const subject = `${user.email} wants to be a representant`
  return sendMail(BALLARD_EMAIL, subject, html)
}

const sendShippingLabelTo = async (to, label) => {
  const html = '<div></div>'
  const subject = 'Your Shipping Label is HERE'
  return sendMail(to, subject, html)
}

const sendOrderConfirmationEmailTo = async (to, order, books) => {
  // TODO: Remove this
  console.log('Sending Email:', to, order, books)
  const subject = `Order Confirmation #${order.id.substring(0, 5)}`
  const html = new OrderEmailTemplateBuilder(order, books).build()

  return sendMail(to, subject, html)
}

module.exports = {
  sendShippingLabelTo,
  sendBeARepresentantRequest,
  sendOrderConfirmationEmailTo
}
