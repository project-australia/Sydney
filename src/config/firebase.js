const admin = require('firebase-admin')
const { initializeApp } = require('firebase')

const testPrivateKey = "-----BEGIN PRIVATE KEY-----\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDLWgzdzcOCNM68\\nXpbKyyEn5HXc813Cj+bJSWO9P9q8IZCAXc4J/YeX2r2MmnanomPiAL1N/j1rMVVP\\n0r0g9UFfY50uPjbe4r1hEyWF/IwnOqhR6FkI0znyQu/yZ9uQDwE+gcySZpluBTpd\\n5DkQS7+JiW5k7+GKY3RiUMGlvsTegamkqxFiM0rLQ2J54mmPHRLvgrW7NVp6ang+\\nHlR+3j5FSgNsE3shl4AP2iSlkdUgMdSYuCjWXSL7nTUE0/90mOB+NFvKWEU5GeT4\\nj10VzlNOfdPlc/P1ERBcb5jYWcdh5lAf+V7tI0yjHmQG4F1DRd0c7ocafNI3Pzgs\\nRrxLHFHJAgMBAAECggEAESDnawpxMKdCj67W/ENyakIN5HvSVrhYy/Uk09TMV6Lr\\nIUjleUVz9ahM5YpAOtwMlkWSLH7hDQWlhjj9ycgmxsJlA7dlV05ZfdMHStssMgS4\\nl1efIkVqgNu/CtfRMHf3Fp0HzoAaZeBGW5DE9riurEbZd+KVyJqae8qKGSwxuH0k\\nccogP5ogppJ1+S7PffvAP7FIwv1zI5+QpqGEEQZh2l949hhkz0sEk+3eHBN+MZin\\n1sorLqiJP/evaUSJXj21SF4asEOx1iaf78n9McdEH+Kh41gtA05+u32KGgmL6zvO\\nNKVzo2ZOOGiJE+vySZbMpBxilEjj75TCRneU4JOQdQKBgQD13B3sOydXzU93Zyb3\\nghVvfzczB7fbwYnmOO1anZTG/qCy20kTJNdAwY9G4uoV9KJig3pcxOvsGhgW/1cK\\nzPZ1zRD0QkF/8oSyn564iGLViJXa36QqR9mH2QeTcyGtU7I+tNsPZaCnmsw8xauM\\nOZh6d1bKnCo4COTN0cF7cA7J5QKBgQDTvR3g+5N9oaxt9Ymqbc12UZTveM4HwY0q\\nEukWDP9dYxjgc5q/vicxi+1NsDdwGN3hPuWpziR09wSGnDVV0fWcpUWImlTKxz1Y\\n6Xhh4FnubvQHckGHRNO7qlBOx6GJZlb3w4w0nZ9Alihe0EhjedSbkHq7UIpnbN5t\\nfyDe84qaFQKBgQDun42LUn6FAYg3Y662W1NivB5fMQaKC/ZDtMzqPjfATDK8ZYkv\\nQ3qIJ1Vgf6yjUqSo6ONCVv6EUW9AIuPgX75152qlKAlanY+drr7ma7lBdye7H4S+\\nZK4E4+gufHgbOjiuE+rprsGW6u9/rHsrxlrvwhRC4f84E6m++e7IV6KC4QKBgEJj\\n6OtzVnKs78jmlUzH8wVnXSCdK1TJPn7zwPv2BVf9y34NIXd/owBpFHYoi6ltUpze\\nwNo2Vb4K+fNPJXYMSEvekmfbpDyUrkqjoehmlSwqw/9VtvA4B3+vTlD1TVQsr5Yu\\nTVbuGVICAxR/kEMInz5L1f/HqC33t+JzWxYtHMdlAoGAK9v0G7++0JJV6DN5XIJa\\nVXj7xl3oYNEbgJgEgJD6OTaXPuB1ZyhaLZvAhQhCUPpd6s1bp7W7/xLEBvMl6dIq\\nxl+atDdsHm2seKE8wuxeDxJIx6ZQkOI3BAXgH342AuxOzcedIRfQO6reLNlj9hwS\\nSJ94oBCIxZH4kNmZIbdvHdw=\\n-----END PRIVATE KEY-----\\n"

const getServiceAccount = () => ({
  type: 'service_account',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://accounts.google.com/o/oauth2/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  project_id: process.env.PROJECT_ID || 'testing-firebase-env',
  private_key_id: process.env.PRIVATE_KEY_ID || 'b236ace8f08714ca8d321f04e48082baab011041',
  private_key: process.env.PRIVATE_KEY || testPrivateKey,
  client_email: process.env.CLIENT_EMAIL || 'firebase-adminsdk-6lgtz@testing-firebase-env.iam.gserviceaccount.com',
  client_id: process.env.CLIENT_ID || '108732823485885051623',
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL || 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6lgtz%40testing-firebase-env.iam.gserviceaccount.com'
})

const firebaseConfig = () => (
  const {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID,
    FIREBASE_PROJECT_BUCKET,
    FIREBASE_MESSAGIN_SENDER_ID
  } = process.env

  return {
  apiKey: FIREBASE_API_KEY || 'AIzaSyD6tp9IzTlBucVCnlMnxEJNeEdE1KQ-lEM',
  authDomain: FIREBASE_AUTH_DOMAIN || 'testing-firebase-env.firebaseapp.com',
  databaseURL: FIREBASE_DATABASE_URL || 'https://testing-firebase-env.firebaseio.com',
  storageBucket: FIREBASE_PROJECT_BUCKET || 'testing-firebase-env.appspot.com',
  messagingSenderId: FIREBASE_MESSAGIN_SENDER_ID || '1088175970844',
  projectId: FIREBASE_PROJECT_ID || 'testing-firebase-env'
})

async function initializeFirebaseAdmin () {
  return admin.initializeApp({
    credential: admin.credential.cert(getServiceAccount()),
    databaseURL: process.env.DATABASE_URL || 'https://testing-firebase-env.firebaseio.com'
  })
}

async function initializeFirebase () {
  return initializeApp(firebaseConfig())
}

module.exports = { initializeFirebaseAdmin, initializeFirebase }
