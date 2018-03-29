const { getCustomerEmail } = require('./userService')
const {
  sendShippingLabelTo,
  sendOrderConfirmationEmailTo
} = require('../mailer')
const { saveBooks, changeAvailability } = require('./bookService')
const { generateShippingLabel } = require('../shipping')
const { OrderModel } = require('./models/orderModel')

const UNAVAILABLE_ITEMS = 'Trying to buy an unavailable book'

// FIXME: We have bussiness logic tight with Data Access logic, this isn't good

const createBuyOrder = async (
  customerId,
  items,
  shippingMethod,
  shippingAddress
) => {
  if (someItemsAreNotAvailable(items)) {
    throw new Error(UNAVAILABLE_ITEMS)
  }

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

  const customerEmail = await getCustomerEmail(customerId)
  await sendOrderConfirmationEmailTo(customerEmail, savedOrder)

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
    const label = await generateShippingLabel()
    const customerEmail = await getCustomerEmail(customerId)
    sendShippingLabelTo(customerEmail, label.labelUrl)
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

const someItemsAreNotAvailable = async (items) => {
  return true
}

const updateOrder = async (id, status, transactionId) => {
  return OrderModel.findOneAndUpdate(
    { _id: id },
    { $set: { status, transactionId } },
    { new: true }
  )
}

const findOrdersByUserId = async customerId => {
  return OrderModel.find({ customerId })
}

const findAll = async () => {
  return OrderModel.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'customerId',
        foreignField: '_id',
        as: 'user'
      }
    }
  ])
}

module.exports = {
  UNAVAILABLE_ITEMS,
  updateOrder,
  createBuyOrder,
  createSellOrder,
  findAll,
  findOrdersByUserId
}
