import { BookLookupBuilder } from '../../../fixture/amazonLookup/books/amazonLookupBuilder'
import {
  BookPriceCalculator,
  NOT_INTERESTED_IN_THIS_BOOK,
  THIRTY_FIVE_PERCENT,
  TWENTY_FIVE_PERCENT,
  ACCEPT_AS_DONATION,
  TWENTY_PERCENT
} from '../../../../src/services/BookPriceCalculator'

const calculate = BookPriceCalculator.calculate

describe('Book Evaluation Pricing Rules', () => {
  describe('should not accept book in if', () => {
    it('sales rank > 1200000', () => {
      const book = new BookLookupBuilder().withSalesRank(1200001).buildLookup()
      expect(calculate(book)).toEqual(NOT_INTERESTED_IN_THIS_BOOK)
    })

    it('salesRank > 900000 < 1200000 and price < $20', () => {
      const book = new BookLookupBuilder()
        .withLowestPrice(19.99)
        .withSalesRank(1199999)
        .buildLookup()
      expect(calculate(book)).toEqual(NOT_INTERESTED_IN_THIS_BOOK)

      const anotherBook = new BookLookupBuilder()
        .withLowestPrice(19.99)
        .withSalesRank(900001)
        .buildLookup()
      expect(calculate(anotherBook)).toEqual(NOT_INTERESTED_IN_THIS_BOOK)
    })

    it('salesRank <= 900000 and price < $10', () => {
      const book = new BookLookupBuilder()
        .withLowestPrice(9.99)
        .withSalesRank(900000)
        .buildLookup()
      expect(calculate(book)).toEqual(NOT_INTERESTED_IN_THIS_BOOK)
    })
  })

  describe('should accept as donation if', () => {
    it('salesRank > 900000 < 1.2M and price > $20', () => {
      const book = new BookLookupBuilder()
        .withLowestPrice(20.01)
        .withSalesRank(900001)
        .buildLookup()
      expect(calculate(book)).toEqual(ACCEPT_AS_DONATION)

      const anotherBook = new BookLookupBuilder()
        .withLowestPrice(20.01)
        .withSalesRank(1199999)
        .buildLookup()
      expect(calculate(anotherBook)).toEqual(ACCEPT_AS_DONATION)
    })

    it('salesRank <= 900000 and $20 > price >= $10', () => {
      const book = new BookLookupBuilder()
        .withLowestPrice(10.0)
        .withSalesRank(900000)
        .buildLookup()
      expect(calculate(book)).toEqual(ACCEPT_AS_DONATION)

      const anotherBook = new BookLookupBuilder()
        .withLowestPrice(19.99)
        .withSalesRank(900000)
        .buildLookup()
      expect(calculate(anotherBook)).toEqual(ACCEPT_AS_DONATION)
    })
  })

  describe('should calculate offer discount for', () => {
    it('salesRank <= 199999 and $30 >= price >= $20, 20% PRICE', () => {
      const book = new BookLookupBuilder()
        .withLowestPrice(20.0)
        .withSalesRank(199999)
        .buildLookup()
      expect(calculate(book)).toEqual(book.price * TWENTY_PERCENT)

      const anotherBook = new BookLookupBuilder()
        .withLowestPrice(30.0)
        .withSalesRank(199999)
        .buildLookup()

      expect(calculate(anotherBook)).toEqual(
        anotherBook.price * TWENTY_PERCENT
      )
    })

    it('salesRank <= 199999 and price > $30, 35% PRICE', () => {
      const book = new BookLookupBuilder()
        .withLowestPrice(30.01)
        .withSalesRank(199999)
        .buildLookup()
      expect(calculate(book)).toEqual(book.price * THIRTY_FIVE_PERCENT)
    })

    it('salesRank <= 199999 and price > $30, 35% PRICE', () => {
      const book = new BookLookupBuilder()
        .withLowestPrice(30.01)
        .withSalesRank(199999)
        .buildLookup()
      expect(calculate(book)).toEqual(book.price * THIRTY_FIVE_PERCENT)
    })

    it('200000 >= salesRank >= 499999 and $20 >= price >= $30, 20% PRICE', () => {
      const book = new BookLookupBuilder()
        .withLowestPrice(20.0)
        .withSalesRank(200000)
        .buildLookup()
      expect(calculate(book)).toEqual(book.price * TWENTY_PERCENT)

      const anotherBook = new BookLookupBuilder()
        .withLowestPrice(30.0)
        .withSalesRank(499999)
        .buildLookup()

      expect(calculate(anotherBook)).toEqual(
        anotherBook.price * TWENTY_PERCENT
      )
    })

    it('200000 >= salesRank >= 499999 and price > $30, 25% PRICE', () => {
      const book = new BookLookupBuilder()
        .withLowestPrice(31.0)
        .withSalesRank(200000)
        .buildLookup()
      expect(calculate(book)).toEqual(book.price * TWENTY_FIVE_PERCENT)

      const anotherBook = new BookLookupBuilder()
        .withLowestPrice(31.0)
        .withSalesRank(499999)
        .buildLookup()

      expect(calculate(anotherBook)).toEqual(
        anotherBook.price * TWENTY_FIVE_PERCENT
      )
    })

    it('500000 >= salesRank >= 900000 and price > $30, 20% PRICE', () => {
      const book = new BookLookupBuilder()
        .withLowestPrice(31.0)
        .withSalesRank(500000)
        .buildLookup()
      expect(calculate(book)).toEqual(book.price * TWENTY_PERCENT)

      const anotherBook = new BookLookupBuilder()
        .withLowestPrice(31.0)
        .withSalesRank(899999)
        .buildLookup()

      expect(calculate(anotherBook)).toEqual(
        anotherBook.price * TWENTY_PERCENT
      )
    })
  })
})
