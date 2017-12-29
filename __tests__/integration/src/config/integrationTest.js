const dotenv = require('dotenv')
const { mongooseConfig } = require('../../../../src/config/mongoose')
const { closeConnection } = require('../../../../src/mongoose')

dotenv.config()

export const connectDB = async () => {
  process.env.MONGO_URL = process.env.MONGO_TEST_URL
  await mongooseConfig('integration-test')
}

export const closeDBConnection = () => {
  closeConnection()
}
