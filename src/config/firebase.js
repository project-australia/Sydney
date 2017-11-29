var admin = require('firebase-admin')
var serviceAccount = require('./secrets/firebase-admin-key.json')

async function initializeFirebaseAdmin () {
  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
  })
}

module.exports = { initializeFirebaseAdmin }
