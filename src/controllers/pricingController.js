const { getEvaluationPrice } = require('../services/amazonProductApi')

const getBookEvaluation = async (req, res) => {
  const { isbn } = req.query
  const result = await getEvaluationPrice(isbn)
  res.status(200).json({ result })
}

module.exports = { getBookEvaluation }

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

// REQUEST EXAMPLE localhost:3000/pricing?isbn=9781483358505
