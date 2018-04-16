const { ServiceError } = require('../../domain/services/serviceError')
const { auth } = require('firebase-admin')
const Firebase = require('firebase')

async function sendEmailVerification (user) {
  return user.sendEmailVerification()
}

async function verifyToken (firebaseToken) {
  try {
    return await auth().verifyIdToken(firebaseToken)
  } catch (error) {
    throw new ServiceError(error)
  }
}

async function createUserWithEmailAndPassword (email, password) {
  try {
    const user = await Firebase.auth().createUserWithEmailAndPassword(
      email,
      password
    )
    await sendEmailVerification(user)
    return user
  } catch (error) {
    throw new ServiceError(error)
  }
}

module.exports = { verifyToken, createUserWithEmailAndPassword }
