const { captureError } = require('./apiError')
const UserService = require('../services/database/userService')
const FireBaseService = require('../services/firebase')

const firebaseErrors = {
  'auth/email-already-in-use': 409,
  'auth/weak-password': 400,
  'auth/invalid-email': 400
}

const getAll = async (req, res) => {
  try {
    let users = await UserService.findAllUsers()

    res.status(200).json(users)
  } catch (err) {
    return captureError('Get All Users', err, req, res)
  }
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

const requestWithdraw = async (req, res) => {
  const { body, params } = req
  const id = params.id

  try {
    const updatedProfile = await UserService.requestWithdraw(id, body)
    res.status(200).json(updatedProfile)
  } catch (err) {
    return captureError('Requesting Withdraw', err, req, res)
  }
}

// TODO: Essa funcao tem que conseguir criar o profile com dados os dados que virao do signup form
const signUp = async (req, res) => {
  const { email, password } = req.body
  try {
    const fireBaseUser = await FireBaseService.createUserWithEmailAndPassword(
      email,
      password
    )

    // FIXME: This is a bad smell
    req.params.id = fireBaseUser.uid
    return createProfile(req, res)
  } catch (err) {
    const { code, message } = err
    return captureError(message, err, req, res, firebaseErrors[code])
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
    const newProfile = await UserService.createProfile(body, id)
    res.status(201).json(newProfile)
  } catch (err) {
    return captureError('Creating profile', err, req, res)
  }
}

module.exports = {
  getProfile,
  createProfile,
  updateProfile,
  requestWithdraw,
  getAll,
  signUp
}
