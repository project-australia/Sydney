class ApiError extends Error {
  constructor (...args) {
    super(...args)
    this.name = 'ApiError'
    Error.captureStackTrace(this, ApiError)
  }
}

module.exports = { ApiError }
