var dotenv = require('dotenv')
var mongoose = require('./mongoose')

function initConfigurations () {
  dotenv.config()
  mongoose.connectMongo()
}

module.exports = initConfigurations
