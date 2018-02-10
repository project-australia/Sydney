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
  const id = params.id

  if (!id) {
    return captureError(
      'Creating a profile without passing an ID',
      null,
      req,
      res,
      400
    )
  }

  try {
    const newProfile = await UserService.createProfile(body)
    res.status(201).json(newProfile)
  } catch (err) {
    return captureError('Creating profile', err, req, res)
  }
}

const updateProfile = async (req, res) => {
  const { body, params } = req
  const id = params.id

  try {
    const updatedProfile = await UserService.updateProfile(id, body)
    res.status(200).json(updatedProfile)
  } catch (err) {
    return captureError('Updating profile', err, req, res)
  }
}

const signUp = async (req, res) => {
  const { email, password } = req.body
  try {
    const fireBaseUser = await FireBaseService.createUserWithEmailAndPassword(
      email,
      password
    )
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
  updateProfile,
  signUp
}
