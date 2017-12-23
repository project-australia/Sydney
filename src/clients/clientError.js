class ClientError extends Error {
  constructor (...args) {
    super(...args)
    this.name = 'ClientError'
    Error.captureStackTrace(this, ClientError)
  }
}

module.exports = { ClientError }
