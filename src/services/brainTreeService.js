const braintree = require('braintree')

let gateway = null

const initializeGateway = async (gatewayConfig) => {
  gatewayConfig.environment = braintree.Environment.Sandbox
  gateway = braintree.connect(gatewayConfig)
}

const getGateway = () => gateway

module.exports = {
  initializeGateway,
  getGateway
}
