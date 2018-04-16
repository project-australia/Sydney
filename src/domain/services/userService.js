const {
  sendBeARepresentantRequest,
  sendARepRequestConfirmation
} = require('../services/orderMailingService')
const {
  findById
} = require('../../data/repositories/usersRepository')

const requestBeARepresentant = async (userId) => {
  const user = await findById(userId)
  sendBeARepresentantRequest(user)
  sendARepRequestConfirmation(user)
}

module.exports = {
  requestBeARepresentant
}
