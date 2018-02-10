const mongoose = require('mongoose')
const blueBird = require('bluebird')
const { connectMongo } = require('../services/database')

async function connect (environment) {
  if (environment === 'test') {
    return
  }

  const options = { useMongoClient: true, promiseLibrary: blueBird }
  let mongoURL =
    environment === 'integration-test'
      ? process.env.MONGO_TEST_URL
      : process.env.MONGO_URL
  mongoose.Promise = blueBird

  await connectMongo(mongoURL, options)
}

const parserOptions = {
  virtuals: true,
  getters: true,
  minimize: false,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    return ret
  }
}

module.exports = { mongooseConfig: connect, parserOptions }
