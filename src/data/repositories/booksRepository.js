const { BookModel } = require('../models/bookModel')

// FIXME: temos isso aqui 15x no codigo
const formatIsbn = isbn => isbn.replace(/-/g, '').trim()

async function saveBooks (books) {
  const promises = books.map(book => saveBook(book))
  return Promise.all(promises)
}

async function saveBook (book) {
  return new BookModel(book).save()
}

async function findBooksByAuthorOrIsnbOrTitle (searchParam) {
  const searchParamLowerCase = searchParam.toLowerCase()
  const regexpParam = { $regex: new RegExp(searchParamLowerCase, 'ig') }
  return BookModel.find({
    $or: [
      { isbn: searchParam },
      { title: regexpParam },
      { authors: regexpParam }
    ],
    $and: [{ status: 'AVAILABLE' }]
  }).exec()
}

async function findByIsbn (isbn) {
  const books = await BookModel.find({
    $or: [{ isbn: formatIsbn(isbn) }]
  }).exec()
  return books && books[0]
}

async function findRecentlyAddedBooks () {
  return BookModel.find({ status: 'AVAILABLE' })
    .sort({ createdAt: -1 })
    .limit(20)
    .exec()
}

async function findFeaturedBooks () {
  return BookModel.find({ featured: true, status: 'AVAILABLE' })
    .sort({ updatedAt: -1 })
    .exec()
}

async function findById (id) {
  return BookModel.findById(id)
}

async function findBySearchPaginated (search) {
  const searchParamLowerCase = search.toLowerCase()
  const regexpParam = { $regex: new RegExp(searchParamLowerCase, 'ig') }
  const books = await BookModel.find({
    $or: [
      { isbn: search },
      { title: regexpParam },
      { authors: regexpParam }
    ]
  })
  const paginatedBooks = {
    books,
    activePage: 1,
    totalPages: 1
  }
  return paginatedBooks
}

async function findAll (activePage) {
  const perPage = 15
  const page = activePage || 1
  const skip = (perPage * page) - perPage
  const books = await BookModel.find({})
    .skip(skip)
    .limit(perPage)
  const totalBooks = await BookModel.count()
  const totalPages = Math.ceil(totalBooks / perPage)
  const paginatedBooks = {
    books,
    activePage: parseInt(page, 10),
    totalPages
  }
  return paginatedBooks
}

async function findBooksByIds (booksIds) {
  return BookModel.find({
    _id: { $in: booksIds }
  })
}

async function changeAvailability (id, status) {
  return updateBook(id, { status })
}

async function updateBook (id, book) {
  return BookModel.findOneAndUpdate({ _id: id }, { $set: book }, { new: true })
}

async function updateBooks (books) {
  const promises = books.map(book => updateBook(book.id, book))
  return Promise.all(promises)
}

module.exports = {
  findBooksByAuthorOrIsnbOrTitle,
  findByIsbn,
  findFeaturedBooks,
  findRecentlyAddedBooks,
  changeAvailability,
  saveBook,
  findById,
  updateBooks,
  findAll,
  saveBooks,
  updateBook,
  findBooksByIds,
  findBySearchPaginated
}
