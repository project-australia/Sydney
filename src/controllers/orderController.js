const OrderService = require('../services/orderService')
const { captureError } = require('./apiError')

const createOrder = async (req, res) => {
  try {
    const order = await OrderService.saveOrder(req.body, req.params.id)
    res.status(201).json(order)
  } catch (err) {
    return captureError('Creating order', err, req, res)
  }
}

module.exports = {
  createOrder
}
