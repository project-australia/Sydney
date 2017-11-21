const dotenv from 'dotenv'
const { mongooseConfig } from '../../../../src/config/mongoose'
const { closeConnection } from '../../../../src/mongoose'

dotenv.config()

export const connectDB = async () => {
  await mongooseConfig('integration-test')
}

export const closeDBConnection = () => {
  closeConnection()
}
