const {
  sendBeARepresentantRequest
} = require('../services/orderMailingService')
const {
  findById
} = require('../../data/repositories/usersRepository')

const requestBeARepresentant = async (userId) => {
  const user = await findById(userId)
  sendBeARepresentantRequest(user)
}

module.exports = {
  requestBeARepresentant
}
