const { getEvaluationPrice } = require('../clients/amazon')

const evaluateBook = async (isbn) => {
  await getEvaluationPrice(isbn)
  const obj = result.find(obj => {
    if (obj['ItemAttributes'][0]['EAN']) {
      return obj['ItemAttributes'][0]['EAN'][0] === isbn
    }
    return false
  })
  let price = ''
  let real = ''
  if (obj['SalesRank'][0]) {
    const u = obj['OfferSummary'][0]['LowestUsedPrice'][0]['FormattedPrice'][0]
    const bestOffer = u.substr(1)
    real = parseFloat(bestOffer)
    if (parseInt(obj['SalesRank'][0], 10) < 600000) {
      price = real * 0.20
    } else if (parseInt(obj['SalesRank'][0], 10) < 900000) {
      price = real * 0.20
    } else {
      price = -1
    }
  }

  return { price, real, obj }
}

module.exports = { evaluateBook }

// If rank 1 - 600, 000 on Amazon
// buy for 25 % of lowest price on Amazon
// If rank 600, 001 - 900, 000 on Amazon
// buy for 20 % of lowest price on Amazon


// After a books is scanned, a non - member will see
// For example:
// For book 9781483358505 Fundamentals of Human Resource Management,
// we are buying it for $18.28(25 % of current lowest price of 69.14 + 3.98 shipping)
// the price of the book($18.28)
// It should also show the 10 % More Club amount of $20.11 with the invitation to sign up

// After a books is scanned, a 10 % member will see
// For example:
// For book 9781483358505 Fundamentals of Human Resource Management we are buying it for $18.28(25 % of current lowest price of 69.14 + 3.98 shipping)
// the price of the book($18.28)
// It should also show the 10 % More Club amount of $20.11
// An invitation to 20 % More Club should say something like
// Get More for yours books here’s how

// After a books is scanned, a 20 % member will see
// For example:
// For book 9781483358505 Fundamentals of Human Resource Management we are buying it for $18.28(25 % of current lowest price of 69.14 + 3.98 shipping)
// the price of the book($18.28)
// It should also show the 20 % More Club amount of $21.94
// It should also show the invitation to sign up to be a rep

// SalesRank

