const { captureError } = require('./apiError')
const EvaluationService = require('../services/bookEvaluation')

// FIXME: Please, remove from the code and git history, my name is on it :(
const formatIsbn = isbn => isbn.replace(/-/, '')
  .replace(/-/, '')
  .replace(/-/, '')
  .replace(/-/, '')
  .trim()

const lookup = async (req, res) => {
  const isbn = req.params.isbn
  const formattedIsbn = formatIsbn(isbn)

  try {
    const evaluation = await EvaluationService.amazonLookup(formattedIsbn)
    res.status(200).json(evaluation)
  } catch (err) {
    return captureError('book lookup', err, req, res)
  }
}

const evaluate = async (req, res) => {
  const isbn = req.params.isbn
  const formattedIsbn = formatIsbn(isbn)

  try {
    const evaluation = await EvaluationService.evaluateBook(formattedIsbn)
    res.status(200).json(evaluation)
  } catch (err) {
    return captureError('book evaluation', err, req, res)
  }
}

module.exports = {
  evaluate,
  lookup
}
