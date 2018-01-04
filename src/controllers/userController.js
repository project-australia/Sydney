const { captureError } = require('./apiError')
const UserService = require('../services/userService')
const FireBaseService = require('../services/firebase')

const getProfile = async (req, res) => {
  const { id } = req.params
  try {
    const userProfile = await UserService.getProfile(id)
    res.status(200).json(userProfile)
  } catch (err) {
    return captureError('Get user profile', err, req, res)
  }
}

const createProfile = async (req, res) => {
  const { body } = req
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

    // If you want create profile just after signin-up, uncomment code below
    // req.body.id = fireBaseUser.uid
    // return createProfile(req, res)
    res.status(201).json(fireBaseUser)
  } catch (err) {
    return captureError('Signing up user', err, req, res)
  }
}

module.exports = {
  getProfile,
  createProfile,
  signUp
}
