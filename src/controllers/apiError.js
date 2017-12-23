class ApiError extends Error {
  constructor (...args) {
    super(...args)
    this.name = 'ApiError'
    this.message = args.userMessage
    Error.captureStackTrace(this, ApiError)
  }
}

module.exports = { ApiError }
