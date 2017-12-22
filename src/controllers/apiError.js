class ApiError extends Error {
  constructor(error) {
    super(error)
    console.error('An error occurred during an API call')
    console.error(JSON.stringify(error))
  }
}

module.exports = { ApiError }
