const mongoose = require('mongoose')
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

  return orders
    .map((order, index) => {
      order.items = books[index]
      return order
    })
    .reverse()
}

const save = async order => new OrderModel(order).save()

const searchOrders = async (searchParam, page = 1) => {
  const { ObjectId } = mongoose.Types
  let id = searchParam
  if (ObjectId.isValid(searchParam)) {
    id = ObjectId(searchParam)
  }
  const perPage = 15
  const skip = perPage * page - perPage
  const orders = await OrderModel.aggregate([
    { $match: { _id: id } },
    {
      $lookup: {
        from: 'users',
        localField: 'customerId',
        foreignField: '_id',
        as: 'user'
      }
    },
    { $sort: { createdAt: -1 } }
  ])
    .skip(skip)
    .limit(perPage)

  const totalPages = 1 // TODO: FIX - se houver outros parametros

  return {
    orders,
    activePage: parseInt(page, 10),
    totalPages
  }
}

const findAllOrders = async (page = 1) => {
  const perPage = 50
  const skip = perPage * page - perPage
  const orders = await OrderModel.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'customerId',
        foreignField: '_id',
        as: 'user'
      }
    },
    { $sort: { createdAt: -1 } }
  ])
    .skip(skip)
    .limit(perPage)

  const totalOrders = await OrderModel.count()
  const totalPages = Math.ceil(totalOrders / perPage)

  return {
    orders,
    activePage: parseInt(page, 10),
    totalPages
  }
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
  findOrdersByUserId,
  searchOrders
}
