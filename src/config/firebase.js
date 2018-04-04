const admin = require('firebase-admin')
const { initializeApp } = require('firebase')

const getServiceAccount = () => ({
  type: 'service_account',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://accounts.google.com/o/oauth2/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
})

const firebaseConfig = () => {
  const {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID,
    FIREBASE_PROJECT_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID
  } = process.env

  return {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    storageBucket: FIREBASE_PROJECT_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    projectId: FIREBASE_PROJECT_ID
  }
}

async function initializeFirebaseAdmin() {
  return admin.initializeApp({
    credential: admin.credential.cert(getServiceAccount()),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  })
}

async function initializeFirebase() {
  return initializeApp(firebaseConfig())
}

module.exports = { initializeFirebaseAdmin, initializeFirebase }
