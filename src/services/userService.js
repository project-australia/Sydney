const UserProfileModel = require('../mongoose/models/userModel')

const ALL = {}

async function createProfile (user) {
  const awesomeInstance = new UserProfileModel(user)
  return awesomeInstance.save()
}

async function findAllUsers () {
  return UserProfileModel.find(ALL)
}

async function eraseCollection (areYouSure) {
  if (areYouSure) {
    await UserProfileModel.remove(ALL)
  }
}

module.exports = {
  createProfile,
  findAllUsers,
  eraseCollection
}
