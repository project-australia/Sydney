const dotenv = require('dotenv')
const { mongooseConfig } = require('./mongoose')
const { initializeFirebaseAdmin } = require('./firebase')

async function initialConfigurations () {
  const result = dotenv.config()

  if (result.error) {
    console.error(result.error)
  }

  await mongooseConfig(process.env.NODE_ENV)
  await initializeFirebaseAdmin()
}

module.exports = { initialConfigurations }
