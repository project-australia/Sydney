const mongoose = require('mongoose')
const { parserOptions } = require('../../config/mongoose')

const Schema = mongoose.Schema

let SomeModelSchema = new Schema({
  a_string: { type: String, lowercase: true, trim: true },
  a_date: { type: Date, default: Date.now }
})

SomeModelSchema.set('toJSON', parserOptions)
SomeModelSchema.set('toObject', parserOptions)

module.exports = mongoose.model('SomeModel', SomeModelSchema)
