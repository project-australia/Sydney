const UserService = require('../services/userService')

const getSellingToggle = async (req, res) => {
  const isSellingAvailable = await UserService.getSelling()
  res.status(200).json(isSellingAvailable)
}

const createProfile = async (req, res) => {
  const { body } = req
  const newProfile = await UserService.createProfile(body)
  res.status(201).json(newProfile)
}

module.exports = {
  getSellingToggle,
  createProfile
}
