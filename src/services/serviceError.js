class ServiceError extends Error {
  constructor (err, ...args) {
    super(err, ...args)
    this.rootCause = err
    this.name = 'ServiceError'
    this.code = err.code
    this.message = err.message
    Error.captureStackTrace(this, ServiceError)
  }
}

module.exports = { ServiceError }
