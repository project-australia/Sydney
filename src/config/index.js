import dotenv from 'dotenv'
import { connectMongo } from './mongoose'

export function initConfigurations () {
  dotenv.config()
  connectMongo()
}
