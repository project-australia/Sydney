import { BookLookupBuilder } from '../../../fixture/amazonLookup/books/amazonLookupBuilder'
import {
  BookPriceCalculator,
  ACCEPT_AS_DONATION,
  NOT_INTERESTED_IN_THIS_BOOK
} from '../../../../src/services/BookPriceCalculator'

const calculate = BookPriceCalculator.calculate

describe('Book Evaluation Pricing Rules', () => {
  describe('should not accept book in if', () => {
    it('sales rank > 1.200', () => {
      const book = new BookLookupBuilder().withSalesRank(1201).buildLookup()
      expect(calculate(book)).toEqual(NOT_INTERESTED_IN_THIS_BOOK)
    })

    it('salesRank > 900 < 1.200 and price < $20', () => {
      const book = new BookLookupBuilder()
        .withLowestPrice(19.99)
        .withSalesRank(1199)
        .buildLookup()
      expect(calculate(book)).toEqual(NOT_INTERESTED_IN_THIS_BOOK)

      const anotherBook = new BookLookupBuilder()
        .withLowestPrice(19.99)
        .withSalesRank(901)
        .buildLookup()
      expect(calculate(anotherBook)).toEqual(NOT_INTERESTED_IN_THIS_BOOK)
    })

    it('salesRank <= 900 and price < $10', () => {
      const book = new BookLookupBuilder()
        .withLowestPrice(9.99)
        .withSalesRank(900)
        .buildLookup()
      expect(calculate(book)).toEqual(NOT_INTERESTED_IN_THIS_BOOK)
    })
  })

  describe('should accept as donation if', () => {
    it('salesRank > 900 < 1.2M and price > $20', () => {
      const book = new BookLookupBuilder()
        .withLowestPrice(20.01)
        .withSalesRank(901)
        .buildLookup()
      expect(calculate(book)).toEqual(ACCEPT_AS_DONATION)

      const anotherBook = new BookLookupBuilder()
        .withLowestPrice(20.01)
        .withSalesRank(1199)
        .buildLookup()
      expect(calculate(anotherBook)).toEqual(ACCEPT_AS_DONATION)
    })

    it('salesRank <= 900 and $20 > price >= $10', () => {
      const book = new BookLookupBuilder()
        .withLowestPrice(10.0)
        .withSalesRank(900)
        .buildLookup()
      expect(calculate(book)).toEqual(ACCEPT_AS_DONATION)

      const anotherBook = new BookLookupBuilder()
        .withLowestPrice(19.99)
        .withSalesRank(900)
        .buildLookup()
      expect(calculate(anotherBook)).toEqual(ACCEPT_AS_DONATION)
    })
  })

  describe('should calculate offer discount for', () => {
    it('salesRank <= 199 and $30 >= price >= $20, 20% PRICE', () => {
      const pricePercentage = 0.8

      const book = new BookLookupBuilder()
        .withLowestPrice(20.0)
        .withSalesRank(199)
        .buildLookup()
      expect(calculate(book)).toEqual(book.price * pricePercentage)

      const anotherBook = new BookLookupBuilder()
        .withLowestPrice(30.0)
        .withSalesRank(199)
        .buildLookup()

      expect(calculate(anotherBook)).toEqual(anotherBook.price * pricePercentage)
    })

    it('salesRank <= 199 and price > $30, 35% PRICE', () => {
      const pricePercentage = 0.65

      const book = new BookLookupBuilder()
        .withLowestPrice(30.01)
        .withSalesRank(199)
        .buildLookup()
      expect(calculate(book)).toEqual(book.price * pricePercentage)
    })

    it('salesRank <= 199 and price > $30, 35% PRICE', () => {
      const pricePercentage = 0.65

      const book = new BookLookupBuilder()
        .withLowestPrice(30.01)
        .withSalesRank(199)
        .buildLookup()
      expect(calculate(book)).toEqual(book.price * pricePercentage)
    })

    it('200 >= salesRank >= 499 and $20 >= price >= $30, 20% PRICE', () => {
      const pricePercentage = 0.80

      const book = new BookLookupBuilder()
        .withLowestPrice(20.0)
        .withSalesRank(200)
        .buildLookup()
      expect(calculate(book)).toEqual(book.price * pricePercentage)

      const anotherBook = new BookLookupBuilder()
        .withLowestPrice(30.0)
        .withSalesRank(499)
        .buildLookup()

      expect(calculate(anotherBook)).toEqual(anotherBook.price * pricePercentage)
    })

    it('200 >= salesRank >= 499 and price > $30, 25% PRICE', () => {
      const pricePercentage = 0.75

      const book = new BookLookupBuilder()
        .withLowestPrice(31.00)
        .withSalesRank(200)
        .buildLookup()
      expect(calculate(book)).toEqual(book.price * pricePercentage)

      const anotherBook = new BookLookupBuilder()
        .withLowestPrice(31.00)
        .withSalesRank(499)
        .buildLookup()

      expect(calculate(anotherBook)).toEqual(anotherBook.price * pricePercentage)
    })

    it('500 >= salesRank >= 900 and price > $30, 20% PRICE', () => {
      const pricePercentage = 0.80

      const book = new BookLookupBuilder()
        .withLowestPrice(31.0)
        .withSalesRank(500)
        .buildLookup()
      expect(calculate(book)).toEqual(book.price * pricePercentage)

      const anotherBook = new BookLookupBuilder()
        .withLowestPrice(31.0)
        .withSalesRank(899)
        .buildLookup()

      expect(calculate(anotherBook)).toEqual(anotherBook.price * pricePercentage)
    })
  })
})
