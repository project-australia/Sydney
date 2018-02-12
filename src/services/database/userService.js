const UserProfileModel = require('./models/userModel')

const ALL = {}

const changeIdField = profile => {
  profile._id = profile.id
  delete profile.id
}

const createReferId = profile => {
  profile.referId = profile.email
}

function mapToMongoose (profile, id) {
  const clone = { ...profile, id }
  changeIdField(clone)
  createReferId(clone)
  return clone
}

async function createProfile (profile, id) {
  const awesomeInstance = new UserProfileModel(mapToMongoose(profile, id))
  return awesomeInstance.save()
}

async function findAllUsers () {
  return UserProfileModel.find(ALL)
}

async function findById (id) {
  return UserProfileModel.findById(id)
}

async function updateProfile (id, userProfile) {
  return UserProfileModel.findOneAndUpdate(
    { _id: id },
    { $set: userProfile },
    { new: true }
  )
}

module.exports = {
  createProfile,
  findAllUsers,
  findById,
  updateProfile,
  mapToMongoose
}
