const { captureError } = require('./apiError')
const EvaluationService = require('../services/bookEvaluation')
const { findBooksByAuthorOrIsnbOrTitle, saveBook } = require('../services/bookService')
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

const findBookByParams = async (req, res) => {
  const { searchParam } = req.body
  try {
    const foundedBooks = await findBooksByAuthorOrIsnbOrTitle(searchParam)
    res.status(200).json(foundedBooks)
  } catch (err) {
    return captureError('books not founds', err, req, res)
  }
}

const addNewBooks = async (req, res) => {
  const { books } = req.body
  try {
    books.map(async book => saveBook(book))
    res.status(200).json('books created')
  } catch (err) {
    return captureError('books not saved', err, req, res)
  }
}

module.exports = {
  evaluate,
  lookup,
  findBookByParams,
  addNewBooks
}
