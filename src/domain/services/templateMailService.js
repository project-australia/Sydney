const createEmailBody = body => {
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

  // TODO: Ajustar Preço para Buy e Rent também
  const listBooks = listBooks => {
    const listItem = listBooks.map(book => {
      return `
        <h3>Title: ${book.name}</h3>
        <p>Price: ${book.prices.sell}</p>
        `
    })
    return listItem
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

module.exports = {
  createEmailBody
}
