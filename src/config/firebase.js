var admin = require('firebase-admin')

const getServiceAccount = () => ({
  type: 'service_account',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://accounts.google.com/o/oauth2/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL
})

async function initializeFirebaseAdmin () {
  return admin.initializeApp({
    credential: admin.credential.cert(getServiceAccount()),
    databaseURL: process.env.DATABASE_URL
  })
}

module.exports = { initializeFirebaseAdmin }
