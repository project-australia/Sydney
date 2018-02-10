
const opbeat = require('opbeat')
const dotenv = require('dotenv')
const { mongooseConfig } = require('./mongoose')
const { initializeFirebaseAdmin, initializeFirebase } = require('./firebase')

async function initialConfigurations () {
  const result = dotenv.config()

  if (result.error) {
    console.error('dotEnv error', result.error)
  }

  if (process.env.NODE_ENV === 'production') {
    opbeat.start()
  }

  await mongooseConfig(process.env.NODE_ENV)
  await initializeFirebaseAdmin()
  await initializeFirebase()
}

module.exports = { initialConfigurations }
