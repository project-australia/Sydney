const EvaluationService = require('../services/bookEvaluation')
const { ApiError } = require('./apiError')

const isInvalidISBN = (isbn, res) => {
  if (isNaN(isbn)) {
    res.status(400).json(new ApiError({message: 'Invalid ISBN, please check it out.'})).end()
    return true
  }
  return false
}

const handleControllerErrors = function (error, res) {
  const apiErrorModel = new ApiError(error)
  if (error.name === 'ClientError') {
    res.status(404).json(apiErrorModel) // FIXME: just an example of semantic status code
  } else if (error.name === 'ServiceError') {
    res.status(400).json(apiErrorModel) // FIXME: just an example of semantic status code
  } else {
    res.status(500).json(apiErrorModel) // FIXME: just an example of semantic status code
  }
  res.end()
}

const evaluate = async (req, res) => {
  const isbn = req.query.isbn || req.params.isbn

  if (isInvalidISBN(isbn, res)) {
    return null
  }

  try {
    const { ballardPrice, amazonPrice } = await EvaluationService.evaluateBook(isbn)
    res.status(200).json({ ballardPrice, amazonPrice })
  } catch (error) {
    handleControllerErrors(error, res)
  }
}

const details = async (req, res) => {

}

const find = async (req, res) => {

}

const donate = async (req, res) => {

}

const rent = async (req, res) => {

}

const sell = async (req, res) => {

}

const buy = async (req, res) => {

}

module.exports = {
  buy,
  find,
  rent,
  sell,
  donate,
  details,
  evaluate
}
