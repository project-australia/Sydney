const UserProfileModel = require('../models/userModel')

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

async function findUserBy (param) {
  return UserProfileModel.findOne(param)
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

async function updateWalletBalance (id, balance) {
  const balanceTruncated = balance ? Number(balance.toFixed(2)) : 0
  return updateProfile(id, { wallet: { balance: balanceTruncated } })
}

async function requestWithdrawFromWallet (id, wallet) {
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

async function findUserNetwork (id) {
  const customerEmail = await getCustomerEmail(id)
  return UserProfileModel.find({ referredBy: customerEmail })
}

async function addMoneyToUserWallet (id, money) {
  const user = await findById(id)

  if (!user) {
    throw new Error('User not Found')
  }

  const previousBalance = user.wallet.balance || 0
  const currentBalance = Number(previousBalance + money)

  if (isNaN(currentBalance)) {
    throw new Error('Error during add balance to user account')
  } else {
    return updateWalletBalance(id, currentBalance)
  }
}

const getWhoIndicatedUser = async userId => {
  const user = await findById(userId)
  return findUserBy({ referId: user.referredBy })
}

module.exports = {
  createProfile,
  findAllUsers,
  getWhoIndicatedUser,
  findById,
  updateProfile,
  requestWithdrawFromWallet,
  mapToMongoose,
  getCustomerEmail,
  findUserNetwork,
  addMoneyToUserWallet,
  findUsersByNameOrEmailOrSchool
}
