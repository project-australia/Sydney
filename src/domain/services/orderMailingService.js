const {
  OrderEmailTemplateBuilder
} = require('../builders/orderEmailTemplateBuilder')
const { sendMail } = require('../../data/vendors/sendgrid')

const BALLARD_EMAIL = 'info@ballardbooks.com'

const sendLabelRequestEmail = async (user, items) => {
  const { street, zipCode, state, city } = user.address
  const html = `
  <p><b>${user.name}</b> is requesting a label</p>
  <p>his/her email address is: ${user.email}.</p>
  <p>
    Address: <br>
    ${user.name} <br>
    ${street} <br>
    ${city}, ${state} ${zipCode}
  </p>

  <p>${mapOrderItems(items)}</p>
  <p>Link to genereate label: http://www.something.com</p>
  `

  const subject = `${user.email} is requesting a label`
  return sendMail(BALLARD_EMAIL, subject, html)
}

const sendARepRequestConfirmation = async user => {
  const html = `
  <p>Hi ${user.name},</p>
  <p>
    Thank you for your interest!
    We have received your request. We’ll review your answers and get back to you as soon as possible.
  </p>
  `

  const subject = `Ballard Books Rep request confirmation`
  return sendMail(user.email, subject, html)
}

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

const mapOrderItems = (items) => {
  const toItemsHTML = (html, item) => {
    return `
      <p>
        book: ${item.book.title}<br>
        dimensions: ${JSON.stringify(item.book.dimensions)}
      </p>
    `
  }

  return items.reduce(toItemsHTML, '')
}

module.exports = {
  sendShippingLabelTo,
  sendLabelRequestEmail,
  sendBeARepresentantRequest,
  sendARepRequestConfirmation,
  sendOrderConfirmationEmailTo
}
