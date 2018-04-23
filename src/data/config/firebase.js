const { initializeApp } = require('firebase')

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

async function initializeFirebaseAdmin () {
  return null
}

async function initializeFirebase () {
  return initializeApp(firebaseConfig())
}

module.exports = { initializeFirebaseAdmin, initializeFirebase }
