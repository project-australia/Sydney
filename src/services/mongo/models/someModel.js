var mongoose = require('mongoose')

var Schema = mongoose.Schema

var SomeModelSchema = new Schema({
  id: Schema.Types.ObjectId,
  a_string: { type: String, lowercase: true, trim: true },
  a_date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('SomeModel', SomeModelSchema)
