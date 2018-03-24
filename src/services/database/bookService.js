const BookModel = require('./models/bookModel')

// FIXME: temos isso aqui 15x no codigo
const formatIsbn = isbn => isbn.replace(/-/g, '').trim()

async function saveBooks(books) {
  const promises = books.map(book => saveBook(book))
  return Promise.all(promises)
}

async function saveBook(book) {
  return new BookModel(book).save()
}

async function findBooksByAuthorOrIsnbOrTitle(searchParam) {
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

async function findByIsbn(isbn) {
  const books = await BookModel.find({
    $or: [{ isbn: formatIsbn(isbn) }]
  }).exec()
  return books && books[0]
}

async function findRecentlyAddedBooks() {
  return BookModel.find({ status: 'AVAILABLE' })
    .sort({ createdAt: -1 })
    .limit(20)
    .exec()
}

async function findFeaturedBooks() {
  return BookModel.find({ featured: true, status: 'AVAILABLE' })
    .sort({ updatedAt: -1 })
    .exec()
}

async function findById(id) {
  // TODO: HEBERT AJUDA EU
  // TODO: PROCURA LIVRO PELO ID
  return {}
}

async function markBookAsUnavailable(id) {
  const book = await findById(id)
  // TODO: HEBERT AJUDA EU
  // TODO: ATUALIZA O STATUS DO LIVRO PARA UNAVAILABLE
  return book
}

async function markBooksAsUnavailable(bookList) {
  const promises = bookList.map(book => markBookAsUnavailable(book.id))
  return Promise.all(promises)
}

module.exports = {
  findBooksByAuthorOrIsnbOrTitle,
  findByIsbn,
  findFeaturedBooks,
  findRecentlyAddedBooks,
  markBookAsUnavailable,
  markBooksAsUnavailable,
  saveBook,
  saveBooks
}
