const ExpressValidation = require('express-validation')

function errorHandler (err, req, res) {
  if (err instanceof ExpressValidation.ValidationError) {
    return res.status(err.status).json({ error: err })
  }

  res.locals.message = err.message
  res.status(err.status || 500).json({ error: err })
}

module.exports = { errorHandler }
