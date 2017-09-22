import dotenv from 'dotenv'
import { connectMongo } from './mongoose'

export function initConfigurations () {
  if (process.env.NODE_ENV === 'test') {
    return
  }

  dotenv.config()
  connectMongo()
}
