export const NOT_INTERESTED_IN_THIS_BOOK = undefined
export const ACCEPT_AS_DONATION = 0
const THIRTY_FIVE_PERCENT = 0.35
const TWENTY_FIVE_PERCENT = 0.25
const TWENTY_PERCENT = 0.2

export class BookPriceCalculator {
  static calculate (book) {
    if (isInterestedInDonation(book)) {
      return ACCEPT_AS_DONATION
    }

    if (notInterestedIn(book)) {
      return NOT_INTERESTED_IN_THIS_BOOK
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
  if (salesRank <= 199999) {
    return price > 30 ? THIRTY_FIVE_PERCENT : TWENTY_PERCENT
  } else if (salesRank <= 499999 && salesRank >= 200) {
    return price > 30 ? TWENTY_FIVE_PERCENT : TWENTY_PERCENT
  } else if (salesRank <= 900000 && salesRank >= 500000) {
    return TWENTY_PERCENT
  }

  return 1
}

const calculateBallardSellingPrice = ({ salesRank, price }) => {
  return price - price * ballardSellingPercentage(salesRank, price)
}
