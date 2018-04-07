const dotenv = require('dotenv')
const mongoose = require('mongoose')
const { mongooseConfig } = require('../../../../src/data/config/mongoose')
const { closeConnection } = require('../../../../src/data/repositories/index')

dotenv.config()

export const connectDB = async () => {
  mongoose.connection.on('open', dropDatabase)
  await mongooseConfig('integration-test')
}

export const closeDBConnection = async () => {
  mongoose.connection.on('close', dropDatabase)
  closeConnection()
}

const dropDatabase = () => {
  mongoose.connection.db.dropDatabase()
}
