const OrderRepository = require('../../data/repositories/ordersRepository')
const {
  markOrderAsEmailFailure,
  updateOrder,
  save,
  findAllOrders,
  searchOrders
} = require('../../data/repositories/ordersRepository')
const {
  getCustomerEmail,
  addMoneyToUserWallet,
  getWhoIndicatedUser
} = require('../../data/repositories/usersRepository')
const UsersRepository = require('../../data/repositories/usersRepository')
const {
  sendOrderConfirmationEmailTo,
  sendLabelRequestEmail
} = require('../services/orderMailingService')
const {
  saveBooks,
  changeAvailability,
  findById,
  updateBooks
} = require('../../data/repositories/booksRepository')

const UNAVAILABLE_ITEMS = 'Trying to buy an unavailable book'
const FIRST_TIER_COMMISSION_RATE = 0.05
const SECOND_TIER_COMMISSION_RATE = 0.02

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
      const user = await UsersRepository.findById(customerId)
      await sendLabelRequestEmail(user, items)
    } catch (err) {
      console.err(err)
      // TODO: Nesse caso ainda nao temos a order, possivelmente precisamos passar um parametro
      // para proxima funcao dizendo que já falho ao enviar email
      // await markOrderAsEmailFailure()
    }
  }

  // TODO: REMOVE THIS
  return saveOrder(customerId, books, shippingMethod, shippingAddress, 'SELL')
}

const confirmOrder = async (userId, orderId, books) => {
  const order = await OrderRepository.findById(orderId)

  if (order.status === 'RECEIVED') {
    throw new Error('Trying to confirm and order which is already confirmed')
  }

  const updatedOrder = await updateOrder(orderId, { status: 'RECEIVED' })

  books.forEach((book, index, array) => {
    if (!book.status) {
      book.status = 'AVAILABLE'
      array[index].status = 'AVAILABLE'
    }
  })

  const updatedBooks = await updateBooks(books)
  const totalSellingPrice = updatedBooks.reduce(
    (acc, { prices }) => acc + prices.sell,
    0
  )
  const updatedUser = await addMoneyToUserWallet(userId, totalSellingPrice)
  const firstTierRep = await getWhoIndicatedUser(userId)

  if (firstTierRep) {
    let firstTierId = firstTierRep.id
    await addMoneyToUserWallet(
      firstTierId,
      totalSellingPrice * FIRST_TIER_COMMISSION_RATE
    )
    const secondTierRep = await getWhoIndicatedUser(firstTierId)

    if (secondTierRep) {
      await addMoneyToUserWallet(
        secondTierRep.id,
        totalSellingPrice * SECOND_TIER_COMMISSION_RATE
      )
    }
  }

  return {
    order: updatedOrder,
    user: updatedUser,
    books: updatedBooks
  }
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

  let orderSaved = await save(order)

  try {
    const customerEmail = await getCustomerEmail(customerId)
    await sendOrderConfirmationEmailTo(customerEmail, orderSaved, items)
  } catch (err) {
    await markOrderAsEmailFailure(orderSaved)
    console.error('Error to retrieve user email', err)
  }

  return orderSaved
}

const someItemsAreNotAvailable = async items => {
  const promises = items.map(item => findById(item.id))
  const books = await Promise.all(promises)
  const isAvailable = book => book.status === 'AVAILABLE'
  return !books.every(isAvailable)
}

const serachAll = async searchParam => {
  const paginatedOrders = await searchOrders(searchParam)
  paginatedOrders.orders.forEach(order => {
    order.id = order._id
    delete order._id
    delete order.__v

    if (order.user[0]) {
      order.user = order.user[0]
      order.user.id = order.user._id
      delete order.user._id
    }
  })

  return paginatedOrders
}

const findAll = async activePage => {
  const paginatedOrders = await findAllOrders(activePage)
  paginatedOrders.orders.forEach(order => {
    order.id = order._id
    delete order._id
    delete order.__v

    if (order.user[0]) {
      order.user = order.user[0]
      order.user.id = order.user._id
      delete order.user._id
    }
  })

  return paginatedOrders
}

module.exports = {
  UNAVAILABLE_ITEMS,
  createBuyOrder,
  createSellOrder,
  serachAll,
  confirmOrder,
  updateOrder, // TODO: remove this proxy behaviour
  findAll // TODO: remove this proxy behaviour
}
