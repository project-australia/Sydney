const mongoose = require('mongoose')
const { parserOptions } = require('../../config/mongoose')

const Schema = mongoose.Schema

const images = {
  small: {type: String, trim: true},
  medium: {type: String, trim: true},
  large: {type: String, trim: true}
}

let BookSchema = new Schema({
  status: {type: String, enum: ['RENTED', 'AVAILABLE', 'SOLD', 'UNAVAILABLE'], default: 'UNAVAILABLE'},
  sellingPrice: {type: Number},
  buyingPrice: {type: Number},
  title: {type: String, trim: true, lowercase: true},
  authors: [{type: String, lowercase: true, trim: true}],
  isbn: {type: String, trim: true, lowercase: true},
  edition: {type: String, trim: true, lowercase: true},
  images
})

BookSchema.set('toJSON', parserOptions)
BookSchema.set('toObject', parserOptions)
const collectionName = 'books'

module.exports = mongoose.model(collectionName, BookSchema)
