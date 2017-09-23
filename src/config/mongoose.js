import mongoose from 'mongoose'
import blueBird from 'bluebird'

export async function connectMongo (environment) {
  const options = { useMongoClient: true, promiseLibrary: blueBird }
  let mongoURL = environment === 'integration-test' ? process.env.MONGO_TEST_URL : process.env.MONGO_URL
  mongoose.Promise = blueBird

  await mongoose.connect(mongoURL, options)
  mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))
}

export function closeConnection () {
  mongoose.connection.close()
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
