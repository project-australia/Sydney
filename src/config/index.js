const dotenv = require('dotenv')
const { mongooseConfig } = require('./mongoose')
const { initializeFirebaseAdmin, initializeFirebase } = require('./firebase')

async function initialConfigurations () {
  dotenv.config()
  const { NODE_ENV } = process.env

  await mongooseConfig(NODE_ENV)
  await initializeFirebaseAdmin()
  await initializeFirebase()
}

module.exports = { initialConfigurations }
