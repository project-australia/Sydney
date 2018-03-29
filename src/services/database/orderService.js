const { getCustomerEmail } = require('./userService')
const {
  sendShippingLabelTo,
  sendOrderConfirmationEmailTo
} = require('../mailer')
const { saveBooks, changeAvailability, findById } = require('./bookService')
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
  if (await someItemsAreNotAvailable(items)) {
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

  try {
    const customerEmail = await getCustomerEmail(customerId)
    await sendOrderConfirmationEmailTo(customerEmail, savedOrder)
  } catch (err) {
    await markOrderAsEmailFailure(savedOrder)
  }

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
    try {
      const label = await generateShippingLabel()
      const customerEmail = await getCustomerEmail(customerId)
      sendShippingLabelTo(customerEmail, label.labelUrl)
    } catch (err) {
      // TODO: Nesse caso ainda nao temos a order, possivelmente precisamos passar um parametro
      // para proxima funcao dizendo que já falho ao enviar email
      // await markOrderAsEmailFailure()
    }
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

const markOrderAsEmailFailure = async (order) => {
  // TODO: Need to implement this
}

const someItemsAreNotAvailable = async (items) => {
  const promises = items.map(item => findById(item.id))
  const books = await Promise.all(promises)
  const isAvailable = book => book.status === 'AVAILABLE'
  return !books.every(isAvailable)
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
