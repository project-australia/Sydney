const opbeat = require('opbeat')
const { mongooseConfig } = require('./mongoose')
const { initializeFirebaseAdmin, initializeFirebase } = require('./firebase')

async function initialConfigurations () {
  if (process.env.NODE_ENV === 'production') {
    opbeat.start()
  }

  await mongooseConfig(process.env.NODE_ENV)
  await initializeFirebaseAdmin()
  await initializeFirebase()
}

module.exports = { initialConfigurations }
