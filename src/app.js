var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')
var helmet = require('helmet')

var initConfigurations = require('./config/index')
var configureRoutes = require('./routes/index')

var app = express()

initConfigurations()
configureRoutes(app)

app.disable('x-powered-by')
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(helmet())

module.exports = app
