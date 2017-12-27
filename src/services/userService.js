const UserProfileModel = require('../mongoose/models/userModel')

const ALL = {}

const changeIdField = profile => {
  profile._id = profile.id
  delete profile.id
}

const createReferId = profile => {
  profile.referId = profile.email
}

function mapToMongoose (profile) {
  const clone = {...profile}
  changeIdField(clone)
  createReferId(clone)
  return clone
}

async function createProfile (profile) {
  const awesomeInstance = new UserProfileModel(mapToMongoose(profile))
  return awesomeInstance.save()
}

async function findAllUsers () {
  return UserProfileModel.find(ALL)
}

async function eraseCollection (areYouSure) {
  if (areYouSure && process.env.NODE_ENV !== 'production') {
    await UserProfileModel.remove(ALL)
  }
}

async function findById (id) {
  return UserProfileModel.findById(id)
}

module.exports = {
  createProfile,
  findAllUsers,
  eraseCollection,
  findById,
  mapToMongoose
}
