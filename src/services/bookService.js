const BookModel = require('../mongoose/models/bookModel')

const ALL = {}

async function saveBook (book) {
  return new BookModel(book).save()
}

async function eraseCollection (areYouSure) {
  if (areYouSure && process.env.NODE_ENV !== 'production') {
    await BookModel.remove(ALL)
  }
}

async function findBooksByAuthorOrIsnbOrTitle (searchParam) {
  const searchParamLowerCase = searchParam.toLowerCase()
  return BookModel.find({
    $or: [
      { isbn: searchParam },
      { title: searchParamLowerCase },
      { authors: { '$in': [ searchParamLowerCase ] } }
    ]
  }).exec()
}

module.exports = {
  saveBook,
  eraseCollection,
  findBooksByAuthorOrIsnbOrTitle
}
