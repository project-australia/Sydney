const { ServiceError } = require('./serviceError')
const { auth } = require('firebase-admin')

async function verifyToken (firebaseToken) {
  try {
    return await auth().verifyIdToken(firebaseToken)
  } catch (error) {
    console.log(error)
    throw new ServiceError(error)
  }
}

module.exports = { verifyToken }
