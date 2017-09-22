import mongoose from 'mongoose'
import blueBird from 'bluebird'

export function connectMongo (environment) {
  let mongoURL = environment === 'integration-test' ? process.env.MONGO_TEST_URL : process.env.MONGO_URL

  mongoose.Promise = blueBird
  mongoose.connect(mongoURL, { useMongoClient: true })
  mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))
}

export const parserOptions = {
  virtuals: true,
  getters: true,
  minimize: false,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id
    delete ret._id
    return ret
  }
}
