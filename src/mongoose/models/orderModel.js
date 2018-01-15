const mongoose = require('mongoose')
const { userCollection } = require('./userModel')
const { bookCollection } = require('./bookModel')
const { parserOptions } = require('../../config/mongoose')

const Schema = mongoose.Schema

let OrderSchema = new Schema({
  customerId: {type: String, ref: userCollection},
  type: {type: String, enum: ['RENT', 'BUY', 'SELL']},
  status: {
    type: String,
    enum: ['WAITING_PAYMENT', 'PAYMENT_CONFIRMED', 'CANCELLED', 'RECEIVED', 'SHIPPED'],
    default: 'WAITING_PAYMENT'
  },
  items: [{type: Schema.ObjectId, ref: bookCollection}]
})

OrderSchema.set('toJSON', parserOptions)
OrderSchema.set('toObject', parserOptions)
const collectionName = 'orders'

module.exports = mongoose.model(collectionName, OrderSchema)
