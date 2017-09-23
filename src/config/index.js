import dotenv from 'dotenv'
import { connectMongo } from './mongoose'

export function initConfigurations () {
  dotenv.config()
  const { NODE_ENV } = process.env

  if (NODE_ENV !== 'test') {
    connectMongo(NODE_ENV)
  }
}
