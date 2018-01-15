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

module.exports = {
  saveBook,
  eraseCollection
}
