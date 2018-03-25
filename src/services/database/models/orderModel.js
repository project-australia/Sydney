const mongoose = require('mongoose')
const { userCollection } = require('./userModel')
const { bookCollection } = require('./bookModel')
const { parserOptions } = require('../../../config/mongoose')
const { address } = require('./addressModel')

const Schema = mongoose.Schema

const VALID_ORDER_TYPES = ['RENT', 'BUY', 'SELL', 'DONATE']
const VALID_SHIPPING_METHODS = ['IN_PERSON', 'STANDARD', 'EXPEDITE', 'SHIPPO']
const VALID_ORDER_STATUS = [
  'WAITING_PAYMENT',
  'PAYMENT_CONFIRMED',
  'CANCELLED',
  'RECEIVED',
  'SHIPPED'
]

let OrderSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true
    },
    customerId: { type: String, ref: userCollection, required: true },
    orderType: {
      type: String,
      enum: VALID_ORDER_TYPES,
      required: true
    },
    transactionId: { type: String, trim: true },
    status: {
      type: String,
      enum: VALID_ORDER_STATUS,
      default: 'WAITING_PAYMENT'
    },
    items: [{ type: Schema.ObjectId, ref: bookCollection }],
    shippingMethod: {
      type: String,
      enum: VALID_SHIPPING_METHODS,
      required: true
    },
    total: { type: Number },
    shippingAddress: address
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
  }
)

OrderSchema.set('toJSON', parserOptions)
OrderSchema.set('toObject', parserOptions)
const collectionName = 'orders'

module.exports = {
  OrderModel: mongoose.model(collectionName, OrderSchema),
  VALID_ORDER_TYPES,
  VALID_ORDER_STATUS,
  VALID_SHIPPING_METHODS
}
