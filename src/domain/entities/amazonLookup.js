const idx = require('idx')
const { BookLookup } = require('./bookLookup')

class AmazonLookup {
  constructor (amazonLookupJSONRepresentation) {
    this.lookups = amazonLookupJSONRepresentation
      .map(book => new BookLookup(book))
      .filter(book => book.isPaperback())

    if (this.lookups.length === 0) {
      throw new Error('Paperback book not found')
    }
  }

  get bookLookupWithLowestUsedPrice () {
    const toLowestPriceLookup = (lowest, current) =>
      lowest.lowestUsedPrice < current.lowestUsedPrice ? lowest : current
    return this.lookups.reduce(toLowestPriceLookup, this.lookups[0])
  }

  get bookDimensions () {
    const booksWithDimentions = this.lookups.filter(book => book.dimensions)
    return idx(booksWithDimentions, _ => _[0].dimensions)
  }

  get bookAuthors () {
    const booksWithAuthor = this.lookups.filter(book => book.authors)
    return idx(booksWithAuthor, _ => _[0].authors)
  }

  get bookEdition () {
    const booksWithEdition = this.lookups.filter(book => book.edition)
    return idx(booksWithEdition, _ => _[0].edition)
  }

  get bookImages () {
    const booksWithImages = this.lookups.filter(book => book.images)
    return idx(booksWithImages, _ => _[0].images)
  }
}

module.exports = {
  AmazonLookup
}
