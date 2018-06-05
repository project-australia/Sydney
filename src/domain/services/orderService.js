const OrderRepository = require('../../data/repositories/ordersRepository')
const UsersRepository = require('../../data/repositories/usersRepository')
const BooksRepository = require('../../data/repositories/booksRepository')
const NotificationService = require('../services/notificationService')

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
    .map(item => BooksRepository.changeAvailability(item.book.id, 'RENTED'))
  const buyingBooks = items
    .filter(item => item.type === 'BUY')
    .map(item => BooksRepository.changeAvailability(item.book.id, 'SOLD'))

  const orderItems = await Promise.all([...buyingBooks, ...rentingBooks])

  return saveOrder(
    customerId,
    orderItems,
    shippingMethod,
    shippingAddress,
    'BUY',
    items
  )
}

const createSellOrder = async (
  customerId,
  items,
  shippingMethod,
  shippingAddress
) => {
  const booksFromItem = items.map(item => item.book)
  const books = await BooksRepository.saveBooks(booksFromItem)
  NotificationService.sellingOrderNotification(
    customerId,
    items,
    shippingMethod,
    booksFromItem
  )

  return saveOrder(
    customerId,
    books,
    shippingMethod,
    shippingAddress,
    'SELL',
    items
  )
}

const confirmOrder = async (userId, orderId, books) => {
  const order = await OrderRepository.findById(orderId)

  if (order.status === 'RECEIVED') {
    throw new Error('Trying to confirm and order which is already confirmed')
  }

  const updatedOrder = await OrderRepository.updateOrder(orderId, {
    status: 'RECEIVED'
  })

  books.forEach((book, index, array) => {
    if (!book.status) {
      book.status = 'AVAILABLE'
      array[index].status = 'AVAILABLE'
    }
  })

  const updatedBooks = await BooksRepository.updateBooks(books)
  const totalSellingPrice = updatedBooks.reduce(
    (acc, { prices }) => acc + prices.sell,
    0
  )
  const updatedUser = await UsersRepository.addMoneyToUserWallet(
    userId,
    totalSellingPrice
  )
  const firstTierRep = await UsersRepository.getWhoIndicatedUser(userId)

  if (firstTierRep) {
    let firstTierId = firstTierRep.id
    await UsersRepository.addMoneyToUserWallet(
      firstTierId,
      totalSellingPrice * FIRST_TIER_COMMISSION_RATE
    )
    const secondTierRep = await UsersRepository.getWhoIndicatedUser(firstTierId)

    if (secondTierRep) {
      await UsersRepository.addMoneyToUserWallet(
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
  orderType,
  itemsFromRequest
) => {
  const orderToSave = {
    customerId,
    items: items.map(book => book.id),
    shippingMethod,
    shippingAddress,
    orderType
  }

  const order = await OrderRepository.save(orderToSave)
  NotificationService.orderConfirmNotification(
    customerId,
    order,
    items,
    itemsFromRequest
  )

  return order
}

const someItemsAreNotAvailable = async items => {
  const promises = items.map(item => BooksRepository.findById(item.id))
  const books = await Promise.all(promises)
  const isAvailable = book => book.status === 'AVAILABLE'
  return !books.every(isAvailable)
}

const serachAll = async searchParam => {
  const paginatedOrders = await OrderRepository.searchOrders(searchParam)
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
  const paginatedOrders = await OrderRepository.findAllOrders(activePage)
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
  findAll,
  updateOrder: OrderRepository.updateOrder // TODO: remove this proxy behaviour
}
