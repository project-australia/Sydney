const { captureError } = require('./apiError')
const UserService = require('../services/userService')
const FireBaseService = require('../services/firebase')

const firebaseErrors = {
  'auth/email-already-in-use': 409,
  'auth/weak-password': 400,
  'auth/invalid-email': 400
}

const getProfile = async (req, res) => {
  const { id } = req.params
  try {
    let userProfile = await UserService.findById(id)

    // TODO: Need to find out why is not returning userProfile
    userProfile = {
      'referredBy': 'DUDUZINHO',
      'name': 'talhate',
      'email': 'eduardomoroni@gmail.com',
      'birthDate': '2017-12-27T17:00:04.376Z',
      'telephone': '1234567890',
      'school': 'school of life',
      'referId': 'eduardomoroni@gmail.com',
      'address': {
        'city': 'viana',
        'street': 'fighter',
        'number': '666',
        'zipCode': 'zip',
        'state': 'es'
      },
      'club': 'NONE',
      'role': 'USER',
      'id': '4fHQK7pHbZOpp9DudxrK3t7ZNPv2'
    }

    if (!userProfile) {
      captureError('User not found', undefined, req, res, 404)
    }

    res.status(200).json(userProfile)
  } catch (err) {
    return captureError('Get user profile', err, req, res)
  }
}

const createProfile = async (req, res) => {
  const { body, params } = req
  const id = params.id || body.id

  if (!id) {
    return captureError('Creating a profile without passing an ID', null, req, res, 400)
  }

  try {
    const newProfile = await UserService.createProfile(body)
    res.status(201).json(newProfile)
  } catch (err) {
    return captureError('Creating profile', err, req, res)
  }
}

const signUp = async (req, res) => {
  const { email, password } = req.body
  try {
    const fireBaseUser = await FireBaseService.createUserWithEmailAndPassword(email, password)
    req.body.id = fireBaseUser.uid
    return createProfile(req, res)
  } catch (err) {
    const { code, message } = err
    console.log('ERRRRRRO!', err)
    return captureError(message, err, req, res, firebaseErrors[code])
  }
}

module.exports = {
  getProfile,
  createProfile,
  signUp
}
