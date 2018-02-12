const Joi = require('joi')
const order = require('./order')

exports.create = {
  body: order
}

exports.update = {
  body: {
    transactionId: Joi.string(),
    status: Joi.string().valid(
      'WAITING_PAYMENT',
      'PAYMENT_CONFIRMED',
      'CANCELLED',
      'RECEIVED',
      'SHIPPED'
    )
  }
}
