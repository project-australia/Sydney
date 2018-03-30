const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function createEmailBody (body) {
  const { orderType, status, shippingMethod } = body.fulfillmentValue
  const { state, city, zipCode, street } = body.fulfillmentValue.shippingAddress

  const shippingMethodChoose = shippingType => {
    const address = `<h5>Shipping Address</h5>
    <p>City: ${state}</p>
    <p>State: ${city}</p>
    <p>Street: ${zipCode}</p>
    <p>Zipcode: ${street}</p>`

    const defaulContact =
      '<h5>Contact </h5><p>PLease, Call to (222) 222 222 2222 and call to schedule a time to finalize the transaction</p>'
    return shippingMethod === 'IN_PERSON' ? defaulContact : address
  }

  const listBooks = listBooks => {
    const address = `<h5>Shipping Address</h5>
    <p>City: ${state}</p>
    <p>State: ${city}</p>
    <p>Street: ${zipCode}</p>
    <p>Zipcode: ${street}</p>`

    const defaulContact =
      '<h5>Contact </h5><p>PLease, Call to (222) 222 222 2222 and call to schedule a time to finalize the transaction</p>'
    return shippingMethod === 'IN_PERSON' ? defaulContact : address
  }

  const formatedBody = `
  <body>
   <h3>Order Confirmation - ${orderType}</h3>
   <h5>Payment status</h5>
   <p>${status}</p>
   ${shippingMethodChoose(shippingMethod)}
   ${listBooks(shippingMethod)}
  </body>
  `
  return formatedBody
}

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
  const html = createEmailBody(JSON.stringify(order))

  return sendMail(to, subject, text, html)
}

module.exports = {
  sendShippingLabelTo,
  sendOrderConfirmationEmailTo
}
