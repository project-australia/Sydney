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
  return new UserProfileModel(mapToMongoose(profile, id)).save()
}

async function findAllUsers () {
  return UserProfileModel.find(ALL)
}

async function findUsersByNameOrEmailOrSchool (searchParam) {
  const regexpParam = { $regex: new RegExp(searchParam, 'ig') }
  return UserProfileModel.find({
    $or: [
      { name: searchParam },
      { email: regexpParam },
      { school: regexpParam }
    ]
  }).exec()
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

async function requestWithdraw (id, wallet) {
  return UserProfileModel.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        'wallet.status': 'PENDING',
        'wallet.paypalAccount': wallet.paypalAccount
      }
    },
    { new: true }
  )
}

async function getCustomerEmail (id) {
  const profile = await findById(id)
  return profile.email
}

module.exports = {
  createProfile,
  findAllUsers,
  findById,
  updateProfile,
  requestWithdraw,
  mapToMongoose,
  getCustomerEmail,
  findUsersByNameOrEmailOrSchool
}
