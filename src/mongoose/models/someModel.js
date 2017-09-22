var mongoose = require('mongoose')
var moongooseConfig = require('../../config/mongoose')

var Schema = mongoose.Schema

var SomeModelSchema = new Schema({
  a_string: { type: String, lowercase: true, trim: true },
  a_date: { type: Date, default: Date.now }
})

SomeModelSchema.set('toJSON', moongooseConfig.parserOptions)
SomeModelSchema.set('toObject', moongooseConfig.parserOptions)

module.exports = mongoose.model('SomeModel', SomeModelSchema)
