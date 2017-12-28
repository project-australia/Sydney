const admin = require('firebase-admin')
const { initializeApp } = require('firebase')

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

const firebaseConfig = {
  apiKey: 'AIzaSyD6tp9IzTlBucVCnlMnxEJNeEdE1KQ-lEM',
  authDomain: 'testing-firebase-env.firebaseapp.com',
  databaseURL: 'https://testing-firebase-env.firebaseio.com',
  storageBucket: '',
  messagingSenderId: '1088175970844',
  projectId: 'testing-firebase-env'
}

async function initializeFirebaseAdmin () {
  return admin.initializeApp({
    credential: admin.credential.cert(getServiceAccount()),
    databaseURL: process.env.DATABASE_URL
  })
}

async function initializeFirebase () {
  return initializeApp(firebaseConfig)
}

module.exports = { initializeFirebaseAdmin, initializeFirebase }
