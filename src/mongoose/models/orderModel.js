const mongoose = require('mongoose')
const { userCollection } = require('./userModel')
const { bookCollection } = require('./bookModel')
const { parserOptions } = require('../../config/mongoose')

const Schema = mongoose.Schema

const address = {
  city: {type: String, lowercase: true, trim: true, required: true},
  street: {type: String, lowercase: true, trim: true, required: true},
  number: {type: String, lowercase: true, trim: true, required: true},
  zipCode: {type: String, lowercase: true, trim: true, required: true},
  state: {type: String, lowercase: true, trim: true, required: true}
}

let OrderSchema = new Schema({
  customerId: {type: String, ref: userCollection, required: true},
  type: {type: String, enum: ['RENT', 'BUY', 'SELL'], required: true},
  trackingPaymentId: {type: String, trim: true},
  status: {
    type: String,
    enum: ['WAITING_PAYMENT', 'PAYMENT_CONFIRMED', 'CANCELLED', 'RECEIVED', 'SHIPPED'],
    default: 'WAITING_PAYMENT'
  },
  items: [{type: Schema.ObjectId, ref: bookCollection}],
  shippingAdress: address
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

OrderSchema.set('toJSON', parserOptions)
OrderSchema.set('toObject', parserOptions)
const collectionName = 'orders'

module.exports = mongoose.model(collectionName, OrderSchema)
