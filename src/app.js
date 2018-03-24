const opbeat = require('opbeat')
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const ignoreFavicon = require('./config/middlewares/ignoreFavIcon')
const cors = require('cors')

const { initialConfigurations } = require('./config')
const { router } = require('./controllers/routes')

initialConfigurations()
const app = express()

app.use(ignoreFavicon)
app.disable('x-powered-by')

if (process.env.NODE_ENV === 'production') {
  app.use(opbeat.middleware.express())
}

app.use(cors())

app.use(logger('dev'))
app.use(bodyParser.json({ type: () => true }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(helmet())

app.use(router)

module.exports = app
