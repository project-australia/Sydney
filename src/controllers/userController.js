const UserService = require('../services/userService')

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

module.exports = {
  getProfile,
  createProfile
}
