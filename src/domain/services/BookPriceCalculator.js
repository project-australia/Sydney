const NOT_INTERESTED_IN_THIS_BOOK = undefined
const THIRTY_FIVE_PERCENT = 0.35
const TWENTY_FIVE_PERCENT = 0.25
const ACCEPT_AS_DONATION = 0
const TWENTY_PERCENT = 0.2
const FORTY_PERCENT = 0.4

const MAX_PRICE = 20
const LOWER_PRICE = 10
const AVERAGE_PRICE = 15

const TIER_ZERO_SALES_RANK = 300000
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

    return 1
    return calculateBallardSellingPrice(book)
  }
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

const ballardSellingPercentage = (salesRank, price) => {
  if (salesRank < 200000) {
    return price > 30 ? THIRTY_FIVE_PERCENT : TWENTY_PERCENT
  } else if (salesRank >= 200000 && salesRank < 500000) {
    return price > 30 ? TWENTY_FIVE_PERCENT : TWENTY_PERCENT
  } else if (salesRank >= 500000 && salesRank <= 900000) {
    return TWENTY_PERCENT
  }

  return 1
}

const calculateBallardSellingPrice = ({ salesRank, price }) => {
  return price * ballardSellingPercentage(salesRank, price)
}

module.exports = {
  BookPriceCalculator,
  NOT_INTERESTED_IN_THIS_BOOK,
  THIRTY_FIVE_PERCENT,
  TWENTY_FIVE_PERCENT,
  ACCEPT_AS_DONATION,
  TWENTY_PERCENT,
  FORTY_PERCENT,
  MAX_PRICE,
  AVERAGE_PRICE,
  LOWER_PRICE
}
