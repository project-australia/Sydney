class ServiceError extends Error {
  constructor (err) {
    super(err.message)
    this.rootCause = err
    Error.captureStackTrace(this, ServiceError)

    this.name = this.constructor.name
    this.code = err.code
    this.message = err.message
    this.userMessage = err.message
  }
}

module.exports = { ServiceError }
