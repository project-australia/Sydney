var { auth } = require('firebase-admin')

async function verifyToken (firebaseToken) {
  try {
    return await auth().verifyIdToken(firebaseToken)
  } catch (error) {
    console.log(error)
  }
}

module.exports = { verifyToken }
