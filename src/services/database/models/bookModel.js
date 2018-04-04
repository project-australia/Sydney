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
  buy: { type: Number },
  rent: { type: Number }
}

const BOOK_STATUSES = ['RENTED', 'AVAILABLE', 'SOLD', 'UNAVAILABLE']
const BOOK_CONDITIONS = [
  'Used – Acceptable',
  'Used – Good',
  'Used – Very Good',
  'Used – Like New',
  'New'
]

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
      enum: BOOK_STATUSES,
      default: 'UNAVAILABLE'
    },
    featured: { type: Boolean, default: false },
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
      enum: BOOK_CONDITIONS,
      required: true
    }
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
)

BookSchema.set('toJSON', parserOptions)
BookSchema.set('toObject', parserOptions)
const bookCollection = 'books'

module.exports = {
  BookModel: mongoose.model(bookCollection, BookSchema),
  BOOK_CONDITIONS,
  BOOK_STATUSES,
  bookCollection
}
