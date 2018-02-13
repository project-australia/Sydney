const Joi = require('joi')
const book = require('./book')
const address = require('./address')

module.exports = Joi.object()
  .keys({
    items: Joi.array()
      .items(Joi.string(), book)
      .required(),
    orderType: Joi.string()
      .valid('RENT', 'BUY', 'SELL', 'DONATE')
      .required(),
    customerId: Joi.string(),
    transactionId: Joi.string(),
    shippingMethod: Joi.string()
      .valid('IN_PERSON', 'STANDARD', 'EXPEDITE')
      .required(),
    shippingAddress: address,
    status: Joi.string().valid(
      'WAITING_PAYMENT',
      'PAYMENT_CONFIRMED',
      'CANCELLED',
      'RECEIVED',
      'SHIPPED'
    )
  })
  .required()
