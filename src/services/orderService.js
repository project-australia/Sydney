const OrderModel = require('../mongoose/models/orderModel')
const { findById } = require('./userService')

const ALL = {}

const saveOrder = async (requestBody, customerId) => {
  const customer = await findById(customerId)

  if (customer && customer.id) {
    const order = Object.assign({}, requestBody, { customerId: customer.id })
    return new OrderModel(order).save()
  } else {
    throw new Error(`User ${customerId} Not Found`)
  }
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
