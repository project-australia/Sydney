const { saveBooks, changeAvailability } = require('./bookService')
const { OrderModel } = require('./models/orderModel')

const createBuyOrder = async (
  customerId,
  items,
  shippingMethod,
  shippingAddress
) => {
  const rentingBooks = items
    .filter(item => item.type === 'RENT')
    .map(item => changeAvailability(item.book.id, 'RENTED'))
  const buyingBooks = items
    .filter(item => item.type === 'BUY')
    .map(item => changeAvailability(item.book.id, 'SOLD'))
  const orderItems = await Promise.all([...buyingBooks, ...rentingBooks])

  const savedOrder = await saveOrder(
    customerId,
    orderItems,
    shippingMethod,
    shippingAddress,
    'BUY'
  )

  // TODO: HEBERT AJUDA EU
  // MANDAR EMAIL DE CONFIRMACAO DE ORDER

  return savedOrder
}

const createSellOrder = async (
  customerId,
  items,
  shippingMethod,
  shippingAddress
) => {
  const booksFromItem = items.map(item => item.book)
  const books = await saveBooks(booksFromItem)

  if (shippingMethod === 'SHIPPO') {
    // TODO: HEBERT AJUDA EU
    // CRIAR O LABEL
    // ENVIAR O LABEL POR EMAIL
  }

  return saveOrder(customerId, books, shippingMethod, shippingAddress, 'SELL')
}

const saveOrder = async (
  customerId,
  items,
  shippingMethod,
  shippingAddress,
  orderType
) => {
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

module.exports = {
  updateOrder,
  createBuyOrder,
  createSellOrder
}
