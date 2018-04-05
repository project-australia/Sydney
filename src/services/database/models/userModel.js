const mongoose = require('mongoose')
const { parserOptions } = require('../../../config/mongoose')
const { address } = require('./addressModel')

const Schema = mongoose.Schema

let UserProfileSchema = new Schema({
  _id: { type: String, trim: true, unique: true },
  referId: { type: String, trim: true, unique: true },
  referredBy: { type: String, trim: true },
  name: { type: String, lowercase: true, trim: true },
  email: { type: String, lowercase: true, trim: true, unique: true },
  birthDate: { type: Date },
  telephone: { type: String, lowercase: true, trim: true },
  school: { type: String, lowercase: true, trim: true },
  role: {
    type: String,
    enum: ['OWNER', 'ADMIN', 'REP', 'USER'],
    default: 'USER'
  },
  club: { type: String, enum: ['TEN', 'TWENTY', 'NONE'], default: 'NONE' },
  address,
  wallet: {
    balance: {
      type: Number
    },
    status: {
      type: String,
      enum: ['PENDING', 'NONE'],
      default: 'NONE'
    },
    paypalAccount: {
      type: String
    }
  }
})

UserProfileSchema.set('toJSON', parserOptions)
UserProfileSchema.set('toObject', parserOptions)
const userCollection = 'users'

module.exports = mongoose.model(userCollection, UserProfileSchema)
exports.userCollection = userCollection
