var mongoose = require('mongoose')
var blueBird = require('bluebird')

function connectMongo () {
  mongoose.Promise = blueBird
  mongoose.connect(process.env.MONGO_URL, { useMongoClient: true })
  mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))
}

var parserOptions = {
  virtuals: true,
  getters: true,
  minimize: false,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id
    delete ret._id
    return ret
  }
}

exports.connectMongo = connectMongo
exports.parserOptions = parserOptions
