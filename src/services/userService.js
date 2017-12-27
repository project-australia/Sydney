const UserProfileModel = require('../mongoose/models/userModel')

const ALL = {}

const changeIdField = profile => {
  profile._id = profile.id
  delete profile.id
}

const createReferId = profile => {
  profile.referId = profile.email
}

const mapToMongoose = (profile) => {
  changeIdField(profile)
  createReferId(profile)
  return profile
}

async function createProfile (profile) {
  const awesomeInstance = new UserProfileModel(mapToMongoose(profile))
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
  eraseCollection,
  mapToMongoose
}
