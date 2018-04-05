const Joi = require('joi')
const order = require('./order')
const {
  BOOK_STATUSES,
  BOOK_CONDITIONS
} = require('../../../data/repositories/models/bookModel')

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

exports.confirmation = {
  body: {
    books: Joi.array().items(
      Joi.object()
        .keys({
          id: Joi.string().required(),
          condition: Joi.string().valid(...BOOK_CONDITIONS),
          status: Joi.string().valid(...BOOK_STATUSES),
          prices: Joi.object().keys({
            sell: Joi.number().required(),
            rent: Joi.number().required(),
            buy: Joi.number().required()
          })
        })
        .required()
    )
  }
}
