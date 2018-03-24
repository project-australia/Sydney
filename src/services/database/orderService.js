const { markBooksAsUnavailable, saveBooks } = require('./bookService')
const OrderModel = require('./models/orderModel')

const saveOrder = async (
  customerId,
  items,
  shippingMethod,
  shippingAddress,
  orderType
) => {
  await markBooksAsUnavailable(items)

  const order = {
    customerId,
    items: items.map(book => book.id),
    shippingMethod,
    shippingAddress,
    orderType
  }

  return new OrderModel(order).save()
}

const updateOrder = async (id, status, transactionId) => {
  return OrderModel.findOneAndUpdate(
    { _id: id },
    { $set: { status, transactionId } },
    { new: true }
  )
}

const createBuyOrder = async (
  customerId,
  items,
  shippingMethod,
  shippingAddress
) => {
  // TODO: Precisa de alguma forma de diferenciar isso, na mesa request vira items RENT e items BUY
  // items -> [{ type: 'BUY', id: '5a7a2d4df45d530014007b88', book: [Object] }, { type: 'RENT', id: '5a7a2d4df45d530014007b88', book: [Object] }]
  return saveOrder(customerId, items, shippingMethod, shippingAddress, 'BUY')
}

const createSellOrder = async (
  customerId,
  items,
  shippingMethod,
  shippingAddress
) => {
  const booksFromItem = items.map(item => item.book)
  const books = await saveBooks(booksFromItem)

  return saveOrder(customerId, books, shippingMethod, shippingAddress, 'SELL')
}

module.exports = {
  updateOrder,
  createBuyOrder,
  createSellOrder
}
