const { OrderModel } = require('../models/orderModel')
const { findBooksByIds } = require('./booksRepository')

const updateOrder = async (id, order) => {
  return OrderModel.findOneAndUpdate(
    { _id: id },
    { $set: order },
    { new: true }
  )
}

const findOrdersByUserId = async customerId => {
  const orders = await OrderModel.find({ customerId })
  const booksPromises = orders.map(order => findBooksByIds(order.items))
  const books = await Promise.all(booksPromises)

  const ordersWithBooks = orders.map((order, index) => {
    order.items = books[index]
    return order
  })

  return ordersWithBooks
}

const save = async (order) => new OrderModel(order).save()

const findAllOrders = async () => {
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

async function findById (id) {
  return OrderModel.findById(id)
}

const markOrderAsEmailFailure = async order => {
  const { id } = order
  return OrderModel.findOneAndUpdate(
    { _id: id },
    { $set: { emailSent: false } },
    { new: true }
  )
}

module.exports = {
  updateOrder,
  findAllOrders,
  findById,
  save,
  markOrderAsEmailFailure,
  findOrdersByUserId
}
