const dotenv = require('dotenv')
const { mongooseConfig } = require('./mongoose')
const { initializeFirebaseAdmin, initializeFirebase } = require('./firebase')

async function initialConfigurations () {
  const result = dotenv.config()

  if (result.error) {
    throw result.error
  }

  await mongooseConfig(process.env.NODE_ENV)
  await initializeFirebaseAdmin()
  await initializeFirebase()
}

module.exports = { initialConfigurations }
