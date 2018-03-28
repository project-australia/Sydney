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

const prices = {
  sell: { type: Number },
  // TODO: REMOVE THIS BEFORE GOING PROD
  buy: { type: Number, default: 15.5 },
  // TODO: REMOVE THIS BEFORE GOING PROD
  rent: { type: Number, default: 7.35 }
}

let BookSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true
    },
    status: {
      type: String,
      enum: ['RENTED', 'AVAILABLE', 'SOLD', 'UNAVAILABLE'],
      // TODO: REMOVE THIS BEFORE GOING PROD
      default: 'AVAILABLE' // IT SHOULD'VE BE 'UNAVAILABLE'
    },
    // TODO: REMOVE THIS BEFORE GOING PROD
    featured: { type: Boolean, default: true }, // IT SHOULD'VE BE false
    title: { type: String, trim: true, lowercase: true, required: true },
    authors: [{ type: String, lowercase: true, trim: true }],
    isbn: { type: String, trim: true, lowercase: true, required: true },
    edition: { type: String, trim: true, lowercase: true },
    about: { type: String, trim: true },
    prices,
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
