import { BookLookupBuilder } from '../../../fixture/amazonLookup/books/amazonLookupBuilder'
import {
  BookPriceCalculator,
  NOT_INTERESTED_IN_THIS_BOOK,
  THIRTY_FIVE_PERCENT,
  TWENTY_FIVE_PERCENT,
  ACCEPT_AS_DONATION,
  TWENTY_PERCENT,
  FORTY_PERCENT,
  MAX_PRICE
} from '../../../../src/domain/services/BookPriceCalculator'

const calculate = BookPriceCalculator.calculate

describe('Book Evaluation Pricing Rules', () => {
  let lowerSalesRank
  let higherSalesRank
  let lowerPrice
  let higherPrice

  describe('sales Rank between 1 and 900k', () => {
    beforeAll(() => {
      lowerSalesRank = 1
      higherSalesRank = 900000
    })

    it('DO NOT take if price is below $10', () => {
      higherPrice = 9.99

      higherPriceBondaryAssertion(lowerSalesRank, higherPrice, NOT_INTERESTED_IN_THIS_BOOK)

      const lowerBoundBook = new BookLookupBuilder()
        .withLowestPrice(higherPrice)
        .withSalesRank(lowerSalesRank)
        .buildLookup()
      expect(calculate(lowerBoundBook)).toEqual(NOT_INTERESTED_IN_THIS_BOOK)

      const higherSalesRankBoundary = new BookLookupBuilder()
        .withLowestPrice(higherPrice)
        .withSalesRank(higherSalesRank)
        .buildLookup()
      expect(calculate(higherSalesRankBoundary)).toEqual(NOT_INTERESTED_IN_THIS_BOOK)
    })

    describe('price between $0 and $14.99', () => {
      beforeAll(() => {
        lowerPrice = 0
        higherPrice = 14.99
      })

      it('DONATE if price is between $10 and $15', () => {
        const lowerPrice = 10
        const higherPrice = 15

        const lowerBound = new BookLookupBuilder()
          .withLowestPrice(lowerPrice)
          .withSalesRank(lowerSalesRank)
          .buildLookup()
        expect(calculate(lowerBound)).toEqual(ACCEPT_AS_DONATION)

        const higherBound = new BookLookupBuilder()
          .withLowestPrice(higherPrice)
          .withSalesRank(higherSalesRank)
          .buildLookup()
        expect(calculate(higherBound)).toEqual(ACCEPT_AS_DONATION)

        const higherBoundInvalidSalesRank = new BookLookupBuilder()
          .withLowestPrice(lowerPrice)
          .withSalesRank(lowerSalesRank + 1)
          .buildLookup()
        expect(calculate(higherBoundInvalidSalesRank)).not.toEqual(ACCEPT_AS_DONATION)

        const higherBoundInvalidPrice = new BookLookupBuilder()
          .withLowestPrice(lowerPrice + 0.01)
          .withSalesRank(lowerSalesRank)
          .buildLookup()
        expect(calculate(higherBoundInvalidPrice)).not.toEqual(ACCEPT_AS_DONATION)
      })
    })

    describe('sales Rank between 1 and 300k', () => {
      it('pay 35% if price is between $15 and $20', () => {
        lowerBoundPriceAssertion(1, 15, THIRTY_FIVE_PERCENT)
        higherBoundPriceAssertion(300000, 20, THIRTY_FIVE_PERCENT)
      })

      it('pay 40% if price is above $20', () => {
        lowerBoundPriceAssertion(1, 20, FORTY_PERCENT)

        const higherBound = new BookLookupBuilder()
          .withLowestPrice(20)
          .withSalesRank(300000)
          .buildLookup()
        expect(calculate(higherBound)).toEqual(higherBound.price * FORTY_PERCENT)

        const invalidSalesRank = new BookLookupBuilder()
          .withLowestPrice(20)
          .withSalesRank(300000)
          .buildLookup()
        expect(calculate(invalidSalesRank)).not.toEqual(invalidSalesRank.price * FORTY_PERCENT)
      })
    })
  })

  describe('sales Rank between 900k + 1 and 1200k', () => {
    beforeEach(() => {
      lowerSalesRank = 900001
      higherSalesRank = 1200000
    })

    describe('price is below $15', () => {
      beforeEach(() => {
        lowerPrice = 0
        higherPrice = 14.99
      })

      it('DO NOT take', () => {
        lowerSalesRankBoundaryAssertion(lowerSalesRank, higherPrice, NOT_INTERESTED_IN_THIS_BOOK)
        higherPriceBondaryAssertion(lowerSalesRank, higherPrice, NOT_INTERESTED_IN_THIS_BOOK)

        const higherBound = new BookLookupBuilder()
          .withLowestPrice(higherPrice)
          .withSalesRank(higherSalesRank)
          .buildLookup()

        expect(calculate(higherBound)).toEqual(NOT_INTERESTED_IN_THIS_BOOK)
      })
    })

    describe('price is above $15', () => {
      it('DONATE', () => {
        const lowerPrice = 15 // This case don't have higher price boundary

        lowerBoundConditionAssertion(lowerSalesRank, lowerPrice, ACCEPT_AS_DONATION)
        higherBoundConditionAssertion(higherSalesRank, lowerPrice, ACCEPT_AS_DONATION)
      })
    })
  })

  describe('sales Rank above 1200k', () => {
    it('DO NOT take', () => {
      const whatever = 100
      const lowerSalesRank = 1200001

      const lowerBoundBook = new BookLookupBuilder()
        .withLowestPrice(whatever)
        .withSalesRank(lowerSalesRank)
        .buildLookup()
      expect(calculate(lowerBoundBook)).toEqual(NOT_INTERESTED_IN_THIS_BOOK)

      const bookBelowLowerSalesRankBound = new BookLookupBuilder()
        .withLowestPrice(whatever)
        .withSalesRank(lowerSalesRank - 1)
        .buildLookup()
      expect(calculate(bookBelowLowerSalesRankBound)).not.toEqual(NOT_INTERESTED_IN_THIS_BOOK)
    })
  })
})

const lowerSalesRankBoundaryAssertion = (lowerSalesRank, price, result) => {
  const lowerBoundBook = new BookLookupBuilder()
    .withLowestPrice(price)
    .withSalesRank(lowerSalesRank)
    .buildLookup()
  expect(calculate(lowerBoundBook)).toEqual(result)

  const belowLowerSalesRankBound = new BookLookupBuilder()
    .withLowestPrice(price)
    .withSalesRank(lowerSalesRank - 1)
    .buildLookup()
  expect(calculate(belowLowerSalesRankBound)).not.toEqual(result)
}

const higherSalesRankBoundaryAssertion = (higherSalesRank, price, result) => {
  const higherBounBook = new BookLookupBuilder()
    .withLowestPrice(price)
    .withSalesRank(higherSalesRank)
    .buildLookup()
  expect(calculate(higherBounBook)).toEqual(result)

  const belowLowerSalesRankBound = new BookLookupBuilder()
    .withLowestPrice(price)
    .withSalesRank(higherSalesRank + 1)
    .buildLookup()
  expect(calculate(belowLowerSalesRankBound)).not.toEqual(result)
}

const higherPriceBondaryAssertion = (salesRank, higherPrice, result) => {
  const lowerBoundBook = new BookLookupBuilder()
    .withLowestPrice(higherPrice)
    .withSalesRank(salesRank)
    .buildLookup()
  expect(calculate(lowerBoundBook)).toEqual(result)

  const belowLowerSalesRankBound = new BookLookupBuilder()
    .withLowestPrice(higherPrice + 1)
    .withSalesRank(salesRank)
    .buildLookup()
  expect(calculate(belowLowerSalesRankBound)).not.toEqual(result)
}

const higherSalesRankAssertion = (higherSalesRank, price, result) => {
  const lowerBoundBook = new BookLookupBuilder()
    .withLowestPrice(price)
    .withSalesRank(higherSalesRank)
    .buildLookup()
  expect(calculate(lowerBoundBook)).toEqual(result)

  const belowLowerSalesRankBound = new BookLookupBuilder()
    .withLowestPrice(price)
    .withSalesRank(higherSalesRank + 1)
    .buildLookup()
  expect(calculate(belowLowerSalesRankBound)).not.toEqual(result)
}

const lowerBoundConditionAssertion = (lowerSalesRank, lowerPrice, expectedCondition) => {
  const lowerBoundBook = new BookLookupBuilder()
    .withLowestPrice(lowerPrice)
    .withSalesRank(lowerPrice)
    .buildLookup()
  expect(calculate(lowerBoundBook)).toEqual(expectedCondition)

  const belowLowerSalesRankBound = new BookLookupBuilder()
    .withLowestPrice(lowerPrice)
    .withSalesRank(lowerSalesRank - 1)
    .buildLookup()
  expect(calculate(belowLowerSalesRankBound)).not.toEqual(expectedCondition)

  const belowLowerPriceBound = new BookLookupBuilder()
    .withLowestPrice(lowerPrice - 0.01)
    .withSalesRank(lowerSalesRank)
    .buildLookup()
  expect(calculate(belowLowerPriceBound)).not.toEqual(expectedCondition)
}

const higherBoundConditionAssertion = (higherSalesRank, higherPrice, expectedCondition) => {
  const lowerBoundBook = new BookLookupBuilder()
    .withLowestPrice(higherPrice)
    .withSalesRank(higherSalesRank)
    .buildLookup()
  expect(calculate(lowerBoundBook)).toEqual(expectedCondition)

  const belowLowerSalesRankBound = new BookLookupBuilder()
    .withLowestPrice(higherPrice)
    .withSalesRank(higherSalesRank + 1)
    .buildLookup()
  expect(calculate(belowLowerSalesRankBound)).not.toEqual(expectedCondition)

  const belowLowerPriceBound = new BookLookupBuilder()
    .withLowestPrice(higherPrice + 0.01)
    .withSalesRank(higherSalesRank)
    .buildLookup()
  expect(calculate(belowLowerPriceBound)).not.toEqual(expectedCondition)
}

const lowerBoundPriceAssertion = (salesrank, price, percentage) => {
  const lowerBound = new BookLookupBuilder()
    .withLowestPrice(price)
    .withSalesRank(salesrank)
    .buildLookup()
  expect(calculate(lowerBound)).toEqual(lowerBound.price * percentage)

  const invalidSalesRank = new BookLookupBuilder()
    .withLowestPrice(price)
    .withSalesRank(salesrank - 1)
    .buildLookup()
  expect(calculate(invalidSalesRank)).not.toEqual(invalidSalesRank.price * percentage)

  const invalidPrice = new BookLookupBuilder()
    .withLowestPrice(price - 0.01)
    .withSalesRank(salesrank)
    .buildLookup()
  expect(calculate(invalidPrice)).not.toEqual(invalidPrice.price * percentage)
}

const higherBoundPriceAssertion = (salesrank, price, percentage) => {
  const higherBound = new BookLookupBuilder()
    .withLowestPrice(price)
    .withSalesRank(salesrank)
    .buildLookup()
  expect(calculate(higherBound)).toEqual(higherBound.price * percentage)

  const invalidSalesRank = new BookLookupBuilder()
    .withLowestPrice(price)
    .withSalesRank(salesrank + 1)
    .buildLookup()
  expect(calculate(invalidSalesRank)).not.toEqual(invalidSalesRank.price * percentage)

  const invalidPrice = new BookLookupBuilder()
    .withLowestPrice(price + 0.01)
    .withSalesRank(salesrank)
    .buildLookup()
  expect(calculate(invalidPrice)).not.toEqual(invalidPrice.price * percentage)
}
