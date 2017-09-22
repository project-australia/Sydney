var mongoose = require('mongoose')

console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL)

var db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
