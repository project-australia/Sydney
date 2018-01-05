
const opbeat = require('opbeat')
const dotenv = require('dotenv')
const { mongooseConfig } = require('./mongoose')
const { initializeBrainTree } = require('./braintreeConfig')
const { initializeFirebaseAdmin, initializeFirebase } = require('./firebase')

async function initialConfigurations () {
  const result = dotenv.config()

  if (result.error) {
    console.error('dotEnv error', result.error)
  }

  opbeat.start()
  await mongooseConfig(process.env.NODE_ENV)
  await initializeFirebaseAdmin()
  await initializeBrainTree()
  await initializeFirebase()
}

module.exports = { initialConfigurations }
