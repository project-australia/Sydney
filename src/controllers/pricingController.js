const { evaluateBook } = require('../services/amazon')
const { ApiError } = require('./apiError')

const getBookEvaluation = async (req, res) => {
  const { isbn } = req.query
  try {
    const { price, real, obj } = evaluateBook(isbn)
    res.status(200).json({ obj, price: price.toFixed(2), real })
  } catch (error) {
    console.log('Erro da APi',error)
    res.status(500).json(new ApiError(error))
  }
}

module.exports = { getBookEvaluation }

// REQUEST EXAMPLE localhost:3000/pricing?isbn=9781483358505
