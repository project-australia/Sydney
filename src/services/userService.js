const UserModel = require('../mongoose/models/userModel')

const ALL = {}

async function createUser (user) {
  const awesomeInstance = new UserModel(user)
  return awesomeInstance.save()
}

async function findAllUsers () {
  return UserModel.find(ALL)
}

async function eraseCollection (areYouSure) {
  if (areYouSure) {
    await UserModel.remove(ALL)
  }
}

module.exports = {
  createUser,
  findAllUsers,
  eraseCollection
}
