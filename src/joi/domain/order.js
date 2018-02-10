const Joi = require('joi')
const book = require('./book')
const address = require('./address')

module.exports = Joi.object().keys({
  items: Joi.array().items(Joi.string(), book).required(),
  type: Joi.string().valid('RENT', 'BUY', 'SELL', 'DONATE').required(),
  customerId: Joi.string(),
  transactionId: Joi.string(),
  shippingAddress: address,
  status: Joi.string().valid('WAITING_PAYMENT', 'PAYMENT_CONFIRMED', 'CANCELLED', 'RECEIVED', 'SHIPPED')
}).required()
