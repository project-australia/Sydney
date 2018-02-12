const BookModel = require('./database/models/bookModel')

const ALL = {}

async function saveBook (book) {
  return new BookModel(book).save()
}

async function findBooksByAuthorOrIsnbOrTitle (searchParam) {
  const searchParamLowerCase = searchParam.toLowerCase()
  return BookModel.find({
    $or: [
      { isbn: searchParam },
      { title: searchParamLowerCase },
      { authors: { $in: [searchParamLowerCase] } }
    ]
  }).exec()
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
  findFeaturedBooks
}
