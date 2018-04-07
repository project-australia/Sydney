const {
  OrderEmailTemplateBuilder
} = require('../builders/orderEmailTemplateBuilder')
const { sendMail } = require('../../data/vendors/sendgrid')

/*
 *
 * Venda Local
 * Venda Shipped
 * Compra Local
 * Compra Shipped
 *
 *  Todos listam os livros
 *  todos listam o id da Order
 *  todos precisam do valor da order
 *  Mandar Id da order no tiutlo do email
 *  Se for shipped mandar o endereco
 *  Todos precisam de um Footer Default
 *  Todos precisam de um Header Default
 *
*/

const sendShippingLabelTo = async (to, label) => {
  const html = '<div></div>'
  const subject = 'Your Shipping Label is HERE'
  return sendMail(to, subject, html)
}

const sendOrderConfirmationEmailTo = async (to, order, books) => {
  // TODO: Remove this
  console.log('Sending Email:', to, order, books)
  const subject = `Order Confirmation #${order.id}`
  const html = new OrderEmailTemplateBuilder(order, books).build()

  return sendMail(to, subject, html)
}

module.exports = {
  sendShippingLabelTo,
  sendOrderConfirmationEmailTo
}
