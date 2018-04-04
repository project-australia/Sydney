const Joi = require('joi')
const order = require('./order')
const {
  VALID_BOOK_CONDITIONS
} = require('../../../services/database/models/bookModel')

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

exports.confimation = {
  body: {
    books: Joi.object().keys({
      id: Joi.string().required(),
      condition: Joi.string().valid(...VALID_BOOK_CONDITIONS),
      prices: Joi.object().keys({
        sell: Joi.number().required(),
        rent: Joi.number().required(),
        buy: Joi.number().required()
      })
    })
  }
}
