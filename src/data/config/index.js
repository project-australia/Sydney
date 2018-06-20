const { mongooseConfig } = require('./mongoose')
const { initializeFirebaseAdmin, initializeFirebase } = require('./firebase')

async function initialConfigurations () {
  await mongooseConfig(process.env.NODE_ENV)
  await initializeFirebaseAdmin()
  await initializeFirebase()
}

module.exports = { initialConfigurations }
