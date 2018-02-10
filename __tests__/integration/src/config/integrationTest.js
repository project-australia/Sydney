const dotenv = require('dotenv')
const mongoose = require('mongoose')
const { mongooseConfig } = require('../../../../src/config/mongoose')
const { closeConnection } = require('../../../../src/services/database')

dotenv.config()

export const connectDB = async () => {
  mongoose.connection.on('open', dropDatabase)
  await mongooseConfig('integration-test')
}

export const closeDBConnection = async () => {
  closeConnection()
}

const dropDatabase = () => {
  mongoose.connection.db.dropDatabase()
}
