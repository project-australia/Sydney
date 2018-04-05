const { markOrderAsEmailFailure, updateOrder, save, findAll } = require('../../data/repositories/ordersRepository')
const { getCustomerEmail, addMoneyToUserWallet } = require('../../data/repositories/usersRepository')
const {
  sendShippingLabelTo,
  sendOrderConfirmationEmailTo
} = require('../../domain/services/mailer')
const {
  saveBooks,
  changeAvailability,
  findById,
  updateBooks
} = require('../../data/repositories/booksRepository')
const { generateShippingLabel } = require('../../domain/services/shipping')

const UNAVAILABLE_ITEMS = 'Trying to buy an unavailable book'

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

  return saveOrder(
    customerId,
    orderItems,
    shippingMethod,
    shippingAddress,
    'BUY'
  )
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

const confirmOrder = async (userId, orderId, books) => {
  const updatedOrder = updateOrder(orderId, { status: 'RECEIVED' })
  const totalSellingPrice = books.reduce(
    (acc, { prices }) => acc + prices.sell,
    0
  )
  const updatedBooks = await updateBooks(books)

  const updatedUser = await addMoneyToUserWallet(userId, totalSellingPrice)

  // TODO: find Tier 1 REP
  // TODO: add money to tier 1 Rep Wallet

  // TODO: find Tier 2 REP
  // TODO: add money to tier 2 Rep Wallet

  return {
    order: updatedOrder,
    user: updatedUser,
    books: updatedBooks
  }
}

// FIXME: Data modeling with Bussiness rule
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

  let orderSaved = await save(order)

  try {
    const customerEmail = await getCustomerEmail(customerId)
    await sendOrderConfirmationEmailTo(customerEmail, orderSaved)
  } catch (err) {
    await markOrderAsEmailFailure(orderSaved)
  }

  return orderSaved
}

const someItemsAreNotAvailable = async items => {
  const promises = items.map(item => findById(item.id))
  const books = await Promise.all(promises)
  const isAvailable = book => book.status === 'AVAILABLE'
  return !books.every(isAvailable)
}

module.exports = {
  UNAVAILABLE_ITEMS,
  createBuyOrder,
  createSellOrder,
  confirmOrder,
  updateOrder, // TODO: remove this proxy behaviour
  findAll // TODO: remove this proxy behaviour
}
