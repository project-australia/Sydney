const mongoose = require('mongoose')
const blueBird = require('bluebird')
const { connectMongo } = require('../mongoose')

async function mongooseConfig (environment) {
  let mongoURL
  const { MONGO_TEST_URL, MONGO_URL } = process.env

  if (environment === 'test') {
    return
  }

  if (environment !== 'integration-test') {
    mongoURL = MONGO_TEST_URL
  } else {
    mongoURL = MONGO_URL
  }

  const options = { useMongoClient: true, promiseLibrary: blueBird }
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

module.exports = { mongooseConfig, parserOptions }
