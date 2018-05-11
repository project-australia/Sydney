const mongoose = require('mongoose')
const { parserOptions } = require('../config/mongoose')
const { address } = require('./addressModel')

const Schema = mongoose.Schema
const DEFAULT_REP = 'info@ballardbooks.com'

let UserProfileSchema = new Schema(
  {
    _id: { type: String, trim: true, unique: true },
    referId: { type: String, trim: true, unique: true },
    referredBy: {
      type: String,
      trim: true,
      lowercase: true,
      default: DEFAULT_REP
    },
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
        type: Number,
        default: 0
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
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
  }
)

UserProfileSchema.set('toJSON', parserOptions)
UserProfileSchema.set('toObject', parserOptions)
const userCollection = 'users'

module.exports = {
  UserProfileModel: mongoose.model(userCollection, UserProfileSchema),
  userCollection,
  DEFAULT_REP
}
