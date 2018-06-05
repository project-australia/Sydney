const {
  OrderEmailTemplateBuilder
} = require('../builders/orderEmailTemplateBuilder')
const { sendMail, sendMailWithCC } = require('../../data/vendors/sendgrid')

const BALLARD_EMAIL = 'sales@ballardbooks.com'
const CC_RECIPIENT = 'info@ballardbooks.com'

const sendOrderConfirmationEmailToAdmins = (
  id,
  orderType,
  shippingMethod,
  transactionId,
  customerName,
  customerEmail,
  items = []
) => {
  const subject = `Order #${id.substring(0, 5)} Notification`
  const itemsHtml = items.reduce((acc, item) => {
    let price = JSON.stringify(item.book.prices)

    if (orderType === 'SELL') {
      price = item.book.prices.sell
    } else {
      price =
        item.type === 'RENT' ? item.book.prices.rent : item.book.prices.buy
    }

    return `
      ${acc}</br>
      <p><b>Type: </b> ${item.type}.</p></br>
      <p><b>Title: </b> ${item.book.title}.</p></br>
      <p><b>Price: </b> ${price}.</p></br>
      <p><b>ISBN: </b> ${item.book.isbn}.</p></br>
      <p><b>ISBN 13: </b> ${item.book.isbn13}.</p></br>
    `
  }, '')
  const html = `
  <p><b>Order Type: </b> ${orderType}.</p></br>
  <p><b>Shipping Method: </b> ${shippingMethod}.</p></br>
  <p><b>Transaction Payment: </b> ${transactionId}.</p></br>
  <p><b>Customer Name: </b> ${customerName}.</p></br>
  <p><b>Customer Email: </b> ${customerEmail}.</p></br>
  </br>
  <p><b>Books: </b></p></br>
  ${itemsHtml}
  `

  return sendMail(BALLARD_EMAIL, subject, html)
}

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

const sendRequestWithdraw = async user => {
  const html = `
  <p><b>${user.name}</b> is requesting withdraw</p>
  <p>his/her email address is: ${user.email}.</p>
  `

  const subject = `${user.email} is requesting withdraw`
  return sendMail(BALLARD_EMAIL, subject, html)
}

const sendARepRequestConfirmation = async user => {
  const html = `
  <p>Hi ${user.name},</p>
  <p>
  Thank you for your interest! We have received your request.
  I'd like to tell you a little more about being a rep. Please let me know the best number and time to call you.
  </p>
  <p>
  Best wishes,
  Winnie Ballard
  </p>
  `

  const subject = `Ballard Books Rep request confirmation`
  return sendMailWithCC(user.email, subject, html, CC_RECIPIENT)
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
  const subject = `Order Confirmation #${order.id.substring(0, 5)}`
  const html = new OrderEmailTemplateBuilder(order, books).build()

  return sendMail(to, subject, html)
}

const mapOrderItems = items => {
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
  sendOrderConfirmationEmailTo,
  sendOrderConfirmationEmailToAdmins,
  sendRequestWithdraw
}
