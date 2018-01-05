const { initializeGateway } = require('../services/brainTreeService')

const initializeBrainTree = async () => {
  const gatewayConfig = {
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY
  }

  await initializeGateway(gatewayConfig)
}

module.exports = {
  initializeBrainTree
}
