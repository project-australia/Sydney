const NOT_INTERESTED_IN_THIS_BOOK = undefined
const THIRTY_FIVE_PERCENT = 0.35
const TWENTY_FIVE_PERCENT = 0.25
const ACCEPT_AS_DONATION = 0
const TWENTY_PERCENT = 0.2

class BookPriceCalculator {
  static calculate(book) {
    if (!book.price || notInterestedIn(book)) {
      return NOT_INTERESTED_IN_THIS_BOOK
    }

    if (isInterestedInDonation(book)) {
      return ACCEPT_AS_DONATION
    }

    return calculateBallardSellingPrice(book)
  }
}

const notInterestedIn = ({ salesRank, price }) => {
  if (salesRank > 1200000) {
    return true
  } else if (salesRank > 900000) {
    return price < 20
  }

  return price < 10
}

const isInterestedInDonation = ({ salesRank, price }) => {
  if (salesRank <= 900000) {
    return price >= 10 && price < 20
  } else if (salesRank < 1200000) {
    return price > 20
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
  return price - price * ballardSellingPercentage(salesRank, price)
}

module.exports = {
  BookPriceCalculator,
  NOT_INTERESTED_IN_THIS_BOOK,
  ACCEPT_AS_DONATION
}
