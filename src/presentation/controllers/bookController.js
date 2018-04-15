const { captureError } = require('./apiError')
const EvaluationService = require('../../domain/services/evaluation')
const {
  findBooksByAuthorOrIsnbOrTitle,
  saveBook,
  findByIsbn,
  findRecentlyAddedBooks,
  findFeaturedBooks,
  findAll,
  updateBook,
  findBooksByIds
} = require('../../data/repositories/booksRepository')
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
    evaluation.prices.sell = 1.99
    res.status(200).json(evaluation)
  } catch (err) {
    return captureError(undefined, err, req, res)
  }
}

const findBookByParams = async (req, res) => {
  const { searchParam } = req.query
  try {
    const foundBooks = await findBooksByAuthorOrIsnbOrTitle(searchParam)
    res.status(200).json(foundBooks)
  } catch (err) {
    return captureError('books not founds', err, req, res)
  }
}

const findBookByIsbn = async (req, res) => {
  const isbn = req.params.isbn

  try {
    const booksFound = await findByIsbn(isbn)
    if (booksFound) {
      res.status(200).json(booksFound)
    } else {
      const message = 'Book not found'
      return captureError(message, new Error(message), req, res, 404)
    }
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

const findBooksByArrayOfIds = async (req, res) => {
  const booksId = req.body
  try {
    const books = await findBooksByIds(booksId)
    res.status(200).json(books)
  } catch (err) {
    return captureError('books search by ids not found', err, req, res)
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

const findAllBooks = async (req, res) => {
  try {
    const books = await findAll()
    res.status(200).json(books)
  } catch (err) {
    return captureError('error get all books', err, req, res)
  }
}

const updateABook = async (req, res) => {
  const id = req.params.id
  const bookToUpdate = req.body
  try {
    const book = await updateBook(id, bookToUpdate)
    res.status(200).json(book)
  } catch (err) {
    return captureError('error update a book', err, req, res)
  }
}

module.exports = {
  evaluate,
  lookup,
  findBookByParams,
  addNewBooks,
  getFeaturedBooks,
  findBookByIsbn,
  getRecentlyAddedBooks,
  findAllBooks,
  updateABook,
  findBooksByArrayOfIds
}
