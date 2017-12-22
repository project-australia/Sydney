const EvaluationService = require('../services/bookEvaluation')
const { ApiError } = require('./apiError')
const { ClientError } = require('../clients/clientError')
const { ServiceError } = require('../services/serviceError')

const isInvalidISBN = string => isNaN(string)

// REQUEST EXAMPLE localhost:3000/pricing?isbn=9781483358505
const getBookEvaluation = async (req, res) => {
  const { isbn } = req.query

  if (isInvalidISBN(isbn)) {
    res.status(400).json(new ApiError({message: 'Invalid ISBN, please check it out.'}))
    return null
  }

  try {
    const { ballardPrice, amazonPrice } = await EvaluationService.evaluateBook(isbn)
    res.status(200).json({ ballardPrice, amazonPrice })
  } catch (error) {
    const apiErrorModel = new ApiError(error)
    if (error instanceof ClientError) {
      res.status(404).json(apiErrorModel) // FIXME: just an example of semantic status code
    } else if (error instanceof ServiceError) {
      res.status(400).json(apiErrorModel) // FIXME: just an example of semantic status code
    } else {
      res.status(500).json(apiErrorModel) // FIXME: just an example of semantic status code
    }
  }
}

module.exports = { getBookEvaluation }
