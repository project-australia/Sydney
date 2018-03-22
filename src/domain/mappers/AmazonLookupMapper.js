const { BookPriceCalculator } = require('../../services/BookPriceCalculator')
const { Book, Images, Prices, Dimensions } = require('../entities')

class AmazonLookupMapper {
  static toBook (lookup) {
    const bookLookup = lookup.bookLookupWithLowestUsedPrice
    const isbn = bookLookup.isbn
    const title = bookLookup.title
    const description = bookLookup.description
    const authors = lookup.bookAuthors
    const edition = lookup.bookEdition
    const images = new Images(lookup.bookImages)
    const dimensions = new Dimensions(lookup.bookDimensions)
    const sellingPrice = BookPriceCalculator.calculate(bookLookup)
    const prices = new Prices({sell: sellingPrice})

    return new Book({
      id: new Date(),
      isbn,
      title,
      authors,
      edition,
      images,
      description,
      dimensions,
      prices
    })
  }
}

module.exports = {
  AmazonLookupMapper
}
