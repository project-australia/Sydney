const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const { initialConfigurations } = require('./config')
const { router } = require('./router')

const configs = initialConfigurations()
const app = express()

app.disable('x-powered-by')
app.use(configs.opbeat)
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(helmet())

app.use(router)

module.exports = app
