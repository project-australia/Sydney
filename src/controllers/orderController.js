const OrderService = require('../services/database/orderService')
const { captureError } = require('./apiError')

const createOrder = async (req, res) => {
  try {
    const { orderType, items, shippingMethod, shippingAddress } = req.body
    const customerId = req.params.id

    if (orderType === 'SELL') {
      const order = await OrderService.createSellOrder(
        customerId,
        items,
        shippingMethod,
        shippingAddress
      )
      res.status(201).json(order)
    } else if (orderType === 'BUY') {
      const order = await OrderService.createBuyOrder(
        customerId,
        items,
        shippingMethod,
        shippingAddress
      )
      res.status(201).json(order)
    } else {
      captureError('Invalid OrderType', undefined, req, res, 400)
    }
  } catch (err) {
    return captureError('Creating order', err, req, res)
  }
}

const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params
    const { status, transactionId } = req.body

    if (!orderId || !status) {
      return captureError(
        'Missing Order Id or Status',
        new Error(),
        req,
        res,
        404
      )
    }

    const order = await OrderService.updateOrder(orderId, status, transactionId)

    res.status(200).json(order)
  } catch (err) {
    return captureError('Updating order', err, req, res)
  }
}

module.exports = {
  createOrder,
  updateOrder
}
