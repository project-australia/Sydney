const { captureError } = require('./apiError')
const { getGateway } = require('../services/brainTreeService')

const token = async (req, res) => {
  try {
    const { clientToken, success } = await getGateway().clientToken.generate({})

    if (success) {
      res.status(200).json({token: clientToken})
    } else {
      res.status(404).json({token: 'NOT FOUND'})
    }
  } catch (err) {
    return captureError('Failed on getting Braintree token', err, req, res)
  }
}

module.exports = {
  token
}
