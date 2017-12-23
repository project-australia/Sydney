const dotenv = require('dotenv')
const { mongooseConfig } = require('./mongoose')
const { initializeFirebaseAdmin } = require('./firebase')

async function initialConfigurations () {
  dotenv.config()
  await mongooseConfig(process.env.NODE_ENV)
  await initializeFirebaseAdmin()
}

module.exports = { initialConfigurations }
