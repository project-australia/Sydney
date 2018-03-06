const BookModel = require('./models/bookModel')

const formatIsbn = isbn => isbn.replace(/-/g, '').trim()

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
    ]
  }).exec()
}

async function findByIsbn (isbn) {
  const books = await BookModel.find({
    $or: [
      { isbn: formatIsbn(isbn) }
    ]
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

module.exports = {
  saveBook,
  findBooksByAuthorOrIsnbOrTitle,
  findRecentlyAddedBooks,
  findFeaturedBooks,
  findByIsbn
}
