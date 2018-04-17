const {
  sendBeARepresentantRequest,
  sendARepRequestConfirmation,
  sendRequestWithdraw
} = require('../services/orderMailingService')
const {
  findById,
  requestWithdrawFromWallet
} = require('../../data/repositories/usersRepository')

const requestBeARepresentant = async (userId) => {
  const user = await findById(userId)
  sendBeARepresentantRequest(user)
  sendARepRequestConfirmation(user)
}

const requestMyWithdraw = async (id, wallet) => {
  const user = await requestWithdrawFromWallet(id, wallet)
  sendRequestWithdraw(user)
  return user
}
module.exports = {
  requestBeARepresentant,
  requestMyWithdraw
}
