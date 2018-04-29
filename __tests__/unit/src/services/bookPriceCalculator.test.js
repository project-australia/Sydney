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

const FLOAT_PRECISION = 4

describe('Book Evaluation Pricing Rules', () => {
  let lowerSalesRank
  let higherSalesRank
  let averageSalesRank
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

    it('DONATE if price is between $10 and $14.99', () => {
      const lowerPrice = 10
      const higherPrice = 14.99

      higherPriceBondaryAssertion(lowerSalesRank, higherPrice, ACCEPT_AS_DONATION)
      lowerPriceBondaryAssertion(lowerSalesRank, lowerPrice, ACCEPT_AS_DONATION)

      const lowerBoundBook = new BookLookupBuilder()
        .withLowestPrice(lowerPrice)
        .withSalesRank(lowerSalesRank)
        .buildLookup()
      expect(calculate(lowerBoundBook)).toEqual(ACCEPT_AS_DONATION)

      const higherBoundBook = new BookLookupBuilder()
        .withLowestPrice(higherPrice)
        .withSalesRank(higherSalesRank)
        .buildLookup()
      expect(calculate(higherBoundBook)).toEqual(ACCEPT_AS_DONATION)
    })

    describe('sales Rank between 1 and 300k - 1', () => {
      beforeAll(() => {
        lowerSalesRank = 1
        higherSalesRank = 299999
        averageSalesRank = (lowerSalesRank + higherSalesRank) / 2
      })

      it('pay 35% if price is between $15 and $19.99', () => {
        lowerPrice = 15
        higherPrice = 19.99

        const lowerBoundary = new BookLookupBuilder()
          .withLowestPrice(lowerPrice)
          .withSalesRank(lowerSalesRank)
          .buildLookup()
        expect(calculate(lowerBoundary)).toEqual(lowerBoundary.price * THIRTY_FIVE_PERCENT)

        higherBoundariesAssertion(higherSalesRank, higherPrice, THIRTY_FIVE_PERCENT)
      })

      it('pay 40% if price is above $20', () => {
        lowerPrice = 20

        const aBook = new BookLookupBuilder()
          .withLowestPrice(lowerPrice)
          .withSalesRank(higherSalesRank)
          .buildLookup()
        expect(calculate(aBook)).toEqual(aBook.price * FORTY_PERCENT)

        lowerBoundariesAssertion(lowerSalesRank, lowerPrice, FORTY_PERCENT)
      })
    })
  })

  describe('sales Rank between 900k + 1 and 1200k', () => {
    beforeEach(() => {
      lowerSalesRank = 900001
      higherSalesRank = 1200000
      averageSalesRank = (lowerSalesRank + higherSalesRank) / 2
    })

    it('price below $14.99 DO NOT take', () => {
      higherPrice = 14.99

      lowerSalesRankBoundaryAssertion(lowerSalesRank, higherPrice, NOT_INTERESTED_IN_THIS_BOOK)
      higherPriceBondaryAssertion(averageSalesRank, higherPrice, NOT_INTERESTED_IN_THIS_BOOK)

      const higherBound = new BookLookupBuilder()
        .withLowestPrice(higherPrice)
        .withSalesRank(higherSalesRank)
        .buildLookup()

      expect(calculate(higherBound)).toEqual(NOT_INTERESTED_IN_THIS_BOOK)
    })

    it('price above $14.99 DONATE', () => {
      const lowerPrice = 15

      lowerPriceBondaryAssertion(averageSalesRank, lowerPrice, ACCEPT_AS_DONATION)

      lowerSalesRankBoundaryAssertion(lowerSalesRank, lowerPrice, ACCEPT_AS_DONATION)
      higherSalesRankBoundaryAssertion(higherSalesRank, lowerPrice, ACCEPT_AS_DONATION)
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
    .withLowestPrice(higherPrice + 0.01)
    .withSalesRank(salesRank)
    .buildLookup()
  expect(calculate(belowLowerSalesRankBound)).not.toEqual(result)
}

const lowerPriceBondaryAssertion = (salesRank, lowerPrice, result) => {
  const lowerBoundBook = new BookLookupBuilder()
    .withLowestPrice(lowerPrice)
    .withSalesRank(salesRank)
    .buildLookup()
  expect(calculate(lowerBoundBook)).toEqual(result)

  const belowLowerSalesRankBound = new BookLookupBuilder()
    .withLowestPrice(lowerPrice - 0.01)
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

const higherBoundariesAssertion = (higherSalesRank, higherPrice, percentage) => {
  const higherBoundary = new BookLookupBuilder()
    .withLowestPrice(higherPrice)
    .withSalesRank(higherSalesRank)
    .buildLookup()
  expect(calculate(higherBoundary)).toBeCloseTo(higherBoundary.price * percentage, FLOAT_PRECISION)

  const aboveSalesRankBoundary = new BookLookupBuilder()
    .withLowestPrice(higherPrice)
    .withSalesRank(higherSalesRank + 1)
    .buildLookup()
  expect(calculate(aboveSalesRankBoundary)).not.toBeCloseTo(aboveSalesRankBoundary.price * percentage, FLOAT_PRECISION)

  const abovePriceBoundary = new BookLookupBuilder()
    .withLowestPrice(higherPrice + 0.01)
    .withSalesRank(higherSalesRank)
    .buildLookup()
  expect(calculate(abovePriceBoundary)).not.toBeCloseTo(abovePriceBoundary.price * percentage, FLOAT_PRECISION)
}

const lowerBoundariesAssertion = (lowerSalesRank, lowerPrice, percentage) => {
  const lowerBoundary = new BookLookupBuilder()
    .withLowestPrice(lowerPrice)
    .withSalesRank(lowerSalesRank)
    .buildLookup()
  expect(calculate(lowerBoundary)).toBeCloseTo(lowerBoundary.price * percentage, FLOAT_PRECISION)

  const belowSalesRankBoundary = new BookLookupBuilder()
    .withLowestPrice(lowerPrice)
    .withSalesRank(lowerSalesRank - 1)
    .buildLookup()
  const belowSalesRankBoundaryPrice = calculate(belowSalesRankBoundary)

  if (!belowSalesRankBoundary) {
    expect(belowSalesRankBoundaryPrice).not.toBeCloseTo(belowSalesRankBoundary.price * percentage, FLOAT_PRECISION)
  }

  const belowPriceBoundary = new BookLookupBuilder()
    .withLowestPrice(lowerPrice - 0.01)
    .withSalesRank(lowerSalesRank)
    .buildLookup()
  const belowPriceBoundaryPrice = calculate(belowPriceBoundary)

  if (!belowPriceBoundary) {
    expect(belowPriceBoundaryPrice).not.toBeCloseTo(belowPriceBoundary.price * percentage, FLOAT_PRECISION)
  }
}
