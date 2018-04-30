const NOT_INTERESTED_IN_THIS_BOOK = undefined
const THIRTY_PERCENT = 0.3
const THIRTY_FIVE_PERCENT = 0.35
const FORTY_PERCENT = 0.4
const ACCEPT_AS_DONATION = 0

const MAX_PRICE = 20
const LOWER_PRICE = 10
const AVERAGE_PRICE = 15

const TIER_ONE_SALES_RANK = 500000
const TIER_TWO_SALES_RANK = 770000
const TIER_THREE_SALES_RANK = 900000
const TIER_FOUR_SALES_RANK = 1200000

class BookPriceCalculator {
  static calculate (book) {
    if (!book.salesRank || !book.price || notInterestedIn(book)) {
      return NOT_INTERESTED_IN_THIS_BOOK
    }

    if (isInterestedInDonation(book)) {
      return ACCEPT_AS_DONATION
    }

    return calculateBallardSellingPrice(book)
  }
}

const ballardSellingPercentage = (salesRank, price) => {
  if (salesRank < TIER_ONE_SALES_RANK) {
    return price < MAX_PRICE ? THIRTY_FIVE_PERCENT : FORTY_PERCENT
  }

  if (salesRank < TIER_TWO_SALES_RANK && price >= MAX_PRICE) {
    return THIRTY_FIVE_PERCENT
  }

  return THIRTY_PERCENT
}

const notInterestedIn = ({ salesRank, price }) => {
  if (salesRank > TIER_FOUR_SALES_RANK) {
    return true
  } else if (salesRank > TIER_THREE_SALES_RANK) {
    return price < AVERAGE_PRICE
  }

  return price < LOWER_PRICE
}

const isInterestedInDonation = ({ salesRank, price }) => {
  if (salesRank <= TIER_THREE_SALES_RANK) {
    return price >= LOWER_PRICE && price < AVERAGE_PRICE
  } else if (salesRank <= TIER_FOUR_SALES_RANK) {
    return price >= AVERAGE_PRICE
  }

  return false
}

const calculateBallardSellingPrice = ({ salesRank, price }) =>
  price * ballardSellingPercentage(salesRank, price)

module.exports = {
  BookPriceCalculator,
  NOT_INTERESTED_IN_THIS_BOOK,
  THIRTY_FIVE_PERCENT,
  ACCEPT_AS_DONATION,
  THIRTY_PERCENT,
  FORTY_PERCENT,
  MAX_PRICE,
  AVERAGE_PRICE,
  LOWER_PRICE
}
