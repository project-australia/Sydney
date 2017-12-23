class ServiceError extends Error {
  constructor (...args) {
    super(...args)
    this.name = 'ServiceError'
    Error.captureStackTrace(this, ServiceError)
  }
}

module.exports = { ServiceError }
