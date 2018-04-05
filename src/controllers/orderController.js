const OrderService = require('../services/database/orderService')
const { captureError } = require('./apiError')

const { UNAVAILABLE_ITEMS } = OrderService

const createOrder = async (req, res) => {
  const { orderType, items, shippingMethod, shippingAddress } = req.body
  const customerId = req.params.id

  try {
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
    if (err.message === UNAVAILABLE_ITEMS) {
      return captureError(UNAVAILABLE_ITEMS, err, req, res, 409)
    }

    return captureError('Error during creating an order', err, req, res)
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

    const order = await OrderService.updateOrder(orderId, {
      status,
      transactionId
    })

    res.status(200).json(order)
  } catch (err) {
    return captureError('Updating order', err, req, res)
  }
}

const getAll = async (req, res) => {
  try {
    let orders = await OrderService.findAll()

    res.status(200).json(orders)
  } catch (err) {
    return captureError('Get All Orders', err, req, res)
  }
}

const confirmOrder = async (req, res) => {
  const { orderId, id } = req.params
  const { books } = req.body

  try {
    const orderAfterConfirmation = OrderService.confirmOrder(id, orderId, books)
    res.status(200).json({ order: orderAfterConfirmation })
  } catch (err) {
    return captureError('Order Confirmation Error', err, req, res)
  }
}

module.exports = {
  confirmOrder,
  createOrder,
  updateOrder,
  getAll
}
