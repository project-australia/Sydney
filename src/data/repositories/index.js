const mongoose = require('mongoose')

async function connectMongo (url, options) {
  await mongoose.connect(url, options)
  mongoose.connection.on(
    'error',
    console.error.bind(console, 'MongoDB connection error:')
  )
}

function closeConnection () {
  mongoose.connection.close()
}

module.exports = { connectMongo, closeConnection }
