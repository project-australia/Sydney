const book = require('./book')
const Joi = require('joi')
const address = require('./address')
const {
  VALID_ORDER_TYPES,
  VALID_SHIPPING_METHODS,
  VALID_ORDER_STATUS
} = require('../../../services/database/models/orderModel')

const orderItems = Joi.object().keys({
  book,
  id: Joi.string().required(),
  type: Joi.string()
    .valid(...VALID_ORDER_TYPES)
    .required()
})

// TODO: Existe dois tipo de validacao de ROTA para UPDATE e para POST
module.exports = Joi.object()
  .keys({
    items: Joi.array()
      .items(orderItems)
      .required(),
    orderType: Joi.string()
      .valid(...VALID_ORDER_TYPES)
      .required(),
    shippingMethod: Joi.string()
      .valid(...VALID_SHIPPING_METHODS)
      .required(),
    shippingAddress: address,
    transactionId: Joi.string(),
    status: Joi.string().valid(...VALID_ORDER_STATUS)
  })
  .required()
