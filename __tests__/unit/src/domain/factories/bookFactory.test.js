import PaperbackLookupJSON from '../../../../fixture/amazonLookup/books/paperback'
import KindleLookupJSON from '../../../../fixture/amazonLookup/books/kindleEbook'
import { AmazonLookup } from '../../../../../src/domain/entities/amazonLookup'
import { AmazonLookupMapper } from '../../../../../src/domain/mappers/AmazonLookupMapper'

describe('Amazon Lookup Mapper', () => {
  it('should create a book domain object from an Amazon Lookup', () => {
    const amazonLookup = new AmazonLookup([
      PaperbackLookupJSON,
      KindleLookupJSON
    ])

    const book = AmazonLookupMapper.toBook(amazonLookup)
    expect(book.isbn).toEqual('148335850X')
    expect(book.prices).toEqual({ buy: undefined, rent: undefined, sell: 10.2 })
    expect(book.description).toEqual(undefined)
    expect(book.title).toEqual(
      'Fundamentals Of Human Resource Management Functions, Applications, Skill Development'
    )
    expect(book.authors).toEqual(amazonLookup.bookAuthors)
    expect(book.edition).toEqual(amazonLookup.bookEdition)
    expect(book.dimensions).toEqual(amazonLookup.bookDimensions)
    expect(book.images).toEqual(amazonLookup.bookImages)
  })
})
