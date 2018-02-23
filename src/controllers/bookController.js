const { captureError } = require('./apiError')
const EvaluationService = require('../services/evaluation')
const {
  findBooksByAuthorOrIsnbOrTitle,
  saveBook,
  findByIsbn,
  findRecentlyAddedBooks,
  findFeaturedBooks
} = require('../services/database/bookService')
const formatIsbn = isbn => isbn.replace(/-/g, '').trim()

const lookup = async (req, res) => {
  const isbn = req.params.isbn
  const formattedIsbn = formatIsbn(isbn)

  try {
    const evaluation = await EvaluationService.amazonLookup(formattedIsbn)
    res.status(200).json(evaluation)
  } catch (err) {
    return captureError('book lookup', err, req, res, err.status)
  }
}

const evaluate = async (req, res) => {
  const isbn = req.params.isbn
  const formattedIsbn = formatIsbn(isbn)

  try {
    const evaluation = await EvaluationService.evaluateBook(formattedIsbn)
    res.status(200).json(evaluation)
  } catch (err) {
    return captureError(undefined, err, req, res)
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

const findBookByIsbn = async (req, res) => {
  const isbn = req.params.isbn

  try {
    const booksFound = await findByIsbn(isbn)
    res.status(200).json(booksFound)
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

const getFeaturedBooks = async (req, res) => {
  try {
    const featuredBooks = await findFeaturedBooks()
    res.status(200).json(featuredBooks)
  } catch (err) {
    return captureError('error get featured books', err, req, res)
  }
}

const getRecentlyAddedBooks = async (req, res) => {
  try {
    const recentlyAddedbooks = await findRecentlyAddedBooks()
    res.status(200).json(recentlyAddedbooks)
  } catch (err) {
    return captureError('error get recently added books', err, req, res)
  }
}

module.exports = {
  evaluate,
  lookup,
  findBookByParams,
  addNewBooks,
  getFeaturedBooks,
  findBookByIsbn,
  getRecentlyAddedBooks
}
