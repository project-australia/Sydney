import { BookLookup } from '../../../../../src/domain/entities/bookLookup'
import LooseLeafLookupJSON from '../../../../fixture/amazonLookup/books/looseLeaf'
import HardCoverLookupJSON from '../../../../fixture/amazonLookup/books/hardCover'
import SpiralBoundLookupJSON from '../../../../fixture/amazonLookup/books/spiralBound'
import PaperbackLookupJSON from '../../../../fixture/amazonLookup/books/paperback'
import KindleLookupJSON from '../../../../fixture/amazonLookup/books/kindleEbook'
import { AmazonLookup } from '../../../../../src/domain/entities/amazonLookup'
import { BookLookupBuilder } from '../../../../fixture/amazonLookup/books/amazonLookupBuilder'

describe('Amazon Books Lookup Domain Object', () => {
  it('should filter paperback, hard cover, spiral bound books', () => {
    const amazonLookup = new AmazonLookup([
      KindleLookupJSON,
      LooseLeafLookupJSON,
      HardCoverLookupJSON,
      SpiralBoundLookupJSON,
      PaperbackLookupJSON
    ])

    expect(amazonLookup.lookups).toEqual([
      new BookLookup(LooseLeafLookupJSON),
      new BookLookup(HardCoverLookupJSON),
      new BookLookup(SpiralBoundLookupJSON),
      new BookLookup(PaperbackLookupJSON)
    ])
  })

  it('should return book lookup with lowest used price', () => {
    const fiveBucksBook = new BookLookupBuilder().withLowestPrice(5).build()
    const tenBucksBook = new BookLookupBuilder().withLowestPrice(10).build()
    const twentyBucksBook = new BookLookupBuilder().withLowestPrice(20).build()

    const JSONRepresentation = [fiveBucksBook, tenBucksBook, twentyBucksBook]
    const amazonLookup = new AmazonLookup(JSONRepresentation)

    expect(amazonLookup.bookLookupWithLowestUsedPrice).toEqual(
      new BookLookup(fiveBucksBook)
    )
  })

  it('should get lookup ISBN13', () => {
    const aBookLookup = new BookLookupBuilder().build()
    const expectedISBN = new BookLookup(aBookLookup).isbn13

    const aBookWithNoISBN13 = new BookLookupBuilder().build()
    aBookWithNoISBN13.ItemAttributes[0].EAN[0] = undefined

    const amazonLookup = new AmazonLookup([aBookWithNoISBN13, aBookLookup])
    expect(amazonLookup.isbn13).toEqual(expectedISBN)
  })

  it('should get book dimensions', () => {
    const aBookLookup = new BookLookupBuilder().build()
    const expectedDimensions = new BookLookup(aBookLookup).dimensions

    const aBookWithNoDimentions = new BookLookupBuilder().build()
    aBookWithNoDimentions.ItemAttributes[0].PackageDimensions = undefined

    const amazonLookup = new AmazonLookup([aBookLookup, aBookWithNoDimentions])
    expect(amazonLookup.bookDimensions).toEqual(expectedDimensions)
  })

  it('should get book author', () => {
    const aBookLookup = new BookLookupBuilder().build()
    const expectedAuthors = new BookLookup(aBookLookup).authors

    const aBookWithNoAuthors = new BookLookupBuilder().build()
    aBookWithNoAuthors.ItemAttributes[0].Author = undefined

    const amazonLookup = new AmazonLookup([aBookLookup, aBookWithNoAuthors])
    expect(amazonLookup.bookAuthors).toEqual(expectedAuthors)
  })

  it('should get book edition', () => {
    const aBookLookup = new BookLookupBuilder().build()
    const expectedEdition = new BookLookup(aBookLookup).edition

    const aBookWithNoEdition = new BookLookupBuilder().build()
    aBookWithNoEdition.ItemAttributes[0].Edition = undefined

    const amazonLookup = new AmazonLookup([aBookLookup, aBookWithNoEdition])
    expect(amazonLookup.bookEdition).toEqual(expectedEdition)
  })

  it('should get book images', () => {
    const aBookLookup = new BookLookupBuilder().build()
    const expectedImages = new BookLookup(aBookLookup).images

    const aBookWithNoImages = new BookLookupBuilder().build()
    aBookWithNoImages.SmallImage[0].URL[0] = undefined
    aBookWithNoImages.MediumImage[0].URL[0] = undefined
    aBookWithNoImages.LargeImage[0].URL[0] = undefined

    const amazonLookup = new AmazonLookup([aBookLookup, aBookWithNoImages])
    expect(amazonLookup.bookImages).toEqual(expectedImages)
  })
})
