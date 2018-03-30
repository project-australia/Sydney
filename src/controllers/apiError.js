const opbeat = require('opbeat')

const captureError = async (msg, err = {}, req, res, status) => {
  const error = new ApiError(err, status, msg)
  res.status(error.status).json(error)
}

class ApiError extends Error {
  constructor (error, status, message) {
    super(error.message)
    this.message = message || error.message
    this.userMessage = message || error.message
    this.name = this.constructor.name
    this.status = status || error.status || 500
    this.rootCause = error

    captureStackTrace(this, error.stack)

    if (process.env.NODE_ENV === 'production') {
      opbeat.captureError(error)
    } else {
      console.log(error)
    }
  }
}

const captureStackTrace = (instance, stack) => {
  if (stack) {
    instance.stackTrace = stack
      .split('\n')
      .slice(0, 2)
      .join('')
  }

  Error.captureStackTrace(instance, instance.constructor)
}

module.exports = { captureError }
