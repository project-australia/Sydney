import { BookLookup } from '../../../../../src/domain/entities/bookLookup'
import PaperbackLookupJSON from '../../../../fixture/amazonLookup/books/paperback'
import LooseLeafLookupJSON from '../../../../fixture/amazonLookup/books/looseLeaf'
import HardCoverLookupJSON from '../../../../fixture/amazonLookup/books/hardCover'
import SpiralBoundLookupJSON from '../../../../fixture/amazonLookup/books/spiralBound'

describe('Book Lookup Domain Object', () => {
  let bookLookup

  describe('Spiral Bound Book', () => {
    beforeAll(() => {
      bookLookup = new BookLookup(SpiralBoundLookupJSON)
    })

    it('should know if lookup is Spiral Bound', () => {
      expect(bookLookup.isSpiralBound()).toEqual(true)
    })
  })

  describe('Loose Leaf Book', () => {
    beforeAll(() => {
      bookLookup = new BookLookup(LooseLeafLookupJSON)
    })

    it('should know if lookup is Loose Leaf', () => {
      expect(bookLookup.isLooseLeaf()).toEqual(true)
    })
  })

  describe('Hard Cover Book', () => {
    beforeAll(() => {
      bookLookup = new BookLookup(HardCoverLookupJSON)
    })

    it('should know if lookup is Hard Cover', () => {
      expect(bookLookup.isHardCover()).toEqual(true)
    })
  })

  describe('PaperBack Book', () => {
    beforeAll(() => {
      bookLookup = new BookLookup(PaperbackLookupJSON)
    })

    it('should expose book dimensions', () => {
      const expectedDimensions = {
        height: 0.73,
        length: 8.43,
        weight: 0.79,
        width: 5.85
      }
      expect(bookLookup.dimensions).toEqual(expectedDimensions)
    })

    it('should not break in case of undefined dimension values', () => {
      const lookupJsonRepresentation = Object.assign({}, PaperbackLookupJSON)
      lookupJsonRepresentation.ItemAttributes[0].PackageDimensions = undefined

      const anotherBookLookup = new BookLookup(lookupJsonRepresentation)
      expect(anotherBookLookup.dimensions).toEqual(undefined)
    })

    it('should expose book images', () => {
      const expectedImages = {
        large:
          'https://images-na.ssl-images-amazon.com/images/I/519E5eZgjGL.jpg',
        medium:
          'https://images-na.ssl-images-amazon.com/images/I/519E5eZgjGL._SL160_.jpg',
        small:
          'https://images-na.ssl-images-amazon.com/images/I/519E5eZgjGL._SL75_.jpg'
      }
      expect(bookLookup.images).toEqual(expectedImages)
    })

    it('should know if lookup is paperpack', () => {
      expect(bookLookup.isPaperback()).toEqual(true)
    })

    it('should expose books salesRank', () => {
      expect(bookLookup.salesRank).toEqual(198999)
    })

    it('should expose lowest price', () => {
      expect(bookLookup.lowestUsedPrice).toEqual(25.5)
    })
  })
})
