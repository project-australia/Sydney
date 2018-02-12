const OrderModel = require('./database/models/orderModel')
const { findById } = require('./userService')

const saveOrder = async (requestBody, customerId) => {
  const customer = await findById(customerId)

  if (customer && customer.id) {
    const order = Object.assign({}, requestBody, { customerId: customer.id })
    return new OrderModel(order).save()
  } else {
    throw new Error(`User ${customerId} Not Found`)
  }
}

const updateOrder = async (id, status, transactionId) => {
  const findOneAndUpdate = await OrderModel.findOneAndUpdate(
    { _id: id },
    { $set: { status, transactionId } },
    { new: true }
  )

  console.log('findOneAndUpdate', findOneAndUpdate)

  return findOneAndUpdate
}

module.exports = {
  updateOrder,
  saveOrder
}
