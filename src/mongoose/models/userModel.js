const mongoose = require('mongoose')
const { parserOptions } = require('../../config/mongoose')

const Schema = mongoose.Schema

const address = {city: {type: String, lowercase: true, trim: true}, street: {type: String, lowercase: true, trim: true}, number: {type: String, lowercase: true, trim: true}, zipCode: {type: String, lowercase: true, trim: true}, state: {type: String, lowercase: true, trim: true}}

// TODO: add wallet to this model
let UserProfileSchema = new Schema({
  _id: {type: String, trim: true, unique: true},
  referId: {type: String, trim: true, unique: true},
  referredBy: {type: String, trim: true},
  name: {type: String, lowercase: true, trim: true},
  email: {type: String, lowercase: true, trim: true, unique: true},
  birthDate: {type: Date},
  telephone: {type: String, lowercase: true, trim: true},
  school: {type: String, lowercase: true, trim: true},
  role: {type: String, enum: ['OWNER', 'ADMIN', 'REP', 'USER'], default: 'USER'},
  club: {type: String, enum: ['TEN', 'TWENTY', 'NONE'], default: 'NONE'},
  address: address,
  wallet: {
    ballance: {
      type: Number
    },
    status: {
      type: String, enum: ['PENDING', 'NONE'], default: 'NONE'
    }
  }
})

UserProfileSchema.set('toJSON', parserOptions)
UserProfileSchema.set('toObject', parserOptions)
const userCollection = 'users'

module.exports = mongoose.model(userCollection, UserProfileSchema)
exports.userCollection = userCollection
