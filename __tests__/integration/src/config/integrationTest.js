const dotenv = require('dotenv')
const mongoose = require('mongoose')
const { mongooseConfig } = require('../../../../src/config/mongoose')
const { closeConnection } = require('../../../../src/mongoose')

dotenv.config()

export const connectDB = async () => {
  await mongooseConfig('integration-test')
}

export const closeDBConnection = () => {
  mongoose.connection.db.dropDatabase()
  closeConnection()
}
