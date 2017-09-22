import dotenv from 'dotenv'
import { connectMongo } from './mongoose'

export function initConfigurations () {
  const { NODE_ENV } = process.env
  dotenv.config()

  if (NODE_ENV !== 'test') {
    connectMongo(NODE_ENV)
  }
}
