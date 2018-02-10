const { captureError } = require('./apiError')

const createOrder = async (req, res) => {
  const { params, body } = req

  try {
    res.status(201).json({ body, params })
  } catch (err) {
    return captureError('Creating order', err, req, res)
  }
}

module.exports = {
  createOrder
}
