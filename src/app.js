import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import helmet from 'helmet'

import { initConfigurations } from './config/index'
import configureRoutes from './routes/index'

const app = express()

initConfigurations()
configureRoutes(app)

app.disable('x-powered-by')
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(helmet())

export default app
