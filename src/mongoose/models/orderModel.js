const mongoose = require('mongoose')
const { userCollection } = require('./userModel')
const { bookCollection } = require('./bookModel')
const { parserOptions } = require('../../config/mongoose')
const { address } = require('./addressModel')

const Schema = mongoose.Schema

let OrderSchema = new Schema({
  customerId: {type: String, ref: userCollection, required: true},
  type: {type: String, enum: ['RENT', 'BUY', 'SELL', 'DONATE'], required: true},
  transactionId: {type: String, trim: true},
  status: {
    type: String,
    enum: ['WAITING_PAYMENT', 'PAYMENT_CONFIRMED', 'CANCELLED', 'RECEIVED', 'SHIPPED'],
    default: 'WAITING_PAYMENT'
  },
  items: [{type: Schema.ObjectId, ref: bookCollection}],
  shippingAddress: address
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

OrderSchema.set('toJSON', parserOptions)
OrderSchema.set('toObject', parserOptions)
const collectionName = 'orders'

module.exports = mongoose.model(collectionName, OrderSchema)
