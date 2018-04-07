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
  const subject = 'Your Shipping Label is HERE'
  const text = label
  const html = `<h1> ${label} </h1>`
  return sendMail(to, subject, text, html)
}

const sendOrderConfirmationEmailTo = async (to, order) => {
  const subject = 'Order Confirmation'
  const text = JSON.stringify(order)
  const html = `<h1>${JSON.stringify(order)}</h1>`

  return sendMail(to, subject, text, html)
}

const createEmailBody = body => {
  const { orderType, status, shippingMethod } = body.fulfillmentValue
  const { state, city, zipCode, street } = body.fulfillmentValue.shippingAddress

  const shippingMethodChoose = shippingType => {
    const address = `
      <h5>Shipping Address</h5>
      <p>City: ${state}</p>
      <p>State: ${city}</p>
      <p>Street: ${zipCode}</p>
      <p>Zipcode: ${street}</p>
    `

    const defaulContact =
      '<h5>Contact </h5><p>PLease, Call to (222) 222 222 2222 and call to schedule a time to finalize the transaction</p>'
    return shippingMethod === 'IN_PERSON' ? defaulContact : address
  }

  // TODO: Ajustar Preço para Buy e Rent também
  const listBooks = listBooks => {
    return listBooks.map(book => {
      return `
        <h3>Title: ${book.name}</h3>
        <p>Price: ${book.prices.sell}</p>
        `
    })
  }

  return `
    <body>
     <h3>Order Confirmation - ${orderType}</h3>
     <h5>Payment status</h5>
     <p>${status}</p>
     ${shippingMethodChoose(shippingMethod)}
     ${listBooks(shippingMethod)}
    </body>
  `
}

module.exports = {
  sendShippingLabelTo,
  sendOrderConfirmationEmailTo
}
