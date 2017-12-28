const UserService = require('../services/userService')
const FireBaseService = require('../services/firebase')

const getProfile = async (req, res) => {
  const { id } = req.params
  const userProfile = await UserService.getProfile(id)
  res.status(200).json(userProfile)
}

const createProfile = async (req, res) => {
  const { body } = req
  const newProfile = await UserService.createProfile(body)
  res.status(201).json(newProfile)
}

const signUp = async (req, res) => {
  const { email, password } = req.body
  const fireBaseUser = await FireBaseService.createUserWithEmailAndPassword(email, password)

  // If you want create profile just after signin-up, uncomment code below
  // req.body.id = fireBaseUser.uid
  // return createProfile(req, res)
  res.status(201).json(fireBaseUser)
}

module.exports = {
  getProfile,
  createProfile,
  signUp
}
