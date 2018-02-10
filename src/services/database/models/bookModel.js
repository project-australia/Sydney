const mongoose = require('mongoose')
const { parserOptions } = require('../../../config/mongoose')

const Schema = mongoose.Schema

const images = {
  small: { type: String, trim: true },
  medium: { type: String, trim: true },
  large: { type: String, trim: true }
}

const dimensions = {
  height: { type: Number, trim: true },
  length: { type: Number, trim: true },
  width: { type: Number, trim: true },
  weight: { type: Number, trim: true }
}

let BookSchema = new Schema(
  {
    status: {
      type: String,
      enum: ['RENTED', 'AVAILABLE', 'SOLD', 'UNAVAILABLE'],
      default: 'UNAVAILABLE'
    },
    sellingPrice: { type: Number },
    buyingPrice: { type: Number },
    featured: { type: Boolean, default: false },
    title: { type: String, trim: true, lowercase: true, required: true },
    authors: [{ type: String, lowercase: true, trim: true }],
    isbn: { type: String, trim: true, lowercase: true, required: true },
    edition: { type: String, trim: true, lowercase: true },
    images,
    dimensions,
    condition: {
      type: String,
      enum: [
        'Used – Acceptable',
        'Used – Good',
        'Used – Very Good',
        'Used – Like New',
        'New'
      ],
      required: true
    }
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
)

BookSchema.set('toJSON', parserOptions)
BookSchema.set('toObject', parserOptions)
const bookCollection = 'books'

module.exports = mongoose.model(bookCollection, BookSchema)
exports.bookCollection = bookCollection
