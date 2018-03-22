import { BookPriceCalculator } from '../../services/BookPriceCalculator'
import { Book, Images, Prices, Dimensions } from '../entities'

export class AmazonLookupMapper {
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
    const prices = new Prices(sellingPrice)

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
