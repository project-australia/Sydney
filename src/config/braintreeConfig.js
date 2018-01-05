const { initializeGateway } = require('../services/brainTreeService')

const initializeBrainTree = async () => {
  const gatewayConfig = {
    accessToken: process.env.PAYPAL_ACCESS_TOKEN
  }

  await initializeGateway(gatewayConfig)
}

module.exports = {
  initializeBrainTree
}
