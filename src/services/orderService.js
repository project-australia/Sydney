const OrderModel = require('../mongoose/models/orderModel')

const ALL = {}

async function saveOrder (order) {
  return new OrderModel(order).save()
}

async function eraseCollection (areYouSure) {
  if (areYouSure && process.env.NODE_ENV !== 'production') {
    await OrderModel.remove(ALL)
  }
}

module.exports = {
  saveOrder,
  eraseCollection
}
