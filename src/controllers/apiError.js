const opbeat = require('opbeat')

// TODO: improve signature, it's bad
const captureError = async (msg, err = {}, req, res, status = 500) => {
  const error = new ApiError(err, status, msg)
  res.status(error.status).json(error)
}

class ApiError extends Error {
  constructor (error, status, message) {
    super(error)
    opbeat.captureError(error)
    this.rootCause = error
    this.status = status || 500
    this.stackTrace = error.stack.split('\n').slice(0, 2).join('')
    this.name = this.constructor.name
    this.userMessage = message || error.message
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = { captureError }
