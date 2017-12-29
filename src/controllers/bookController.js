const EvaluationService = require('../services/bookEvaluation')

const evaluate = async (req, res) => {
  const isbn = req.query.isbn || req.params.isbn

  // FIXME: Please, remove from the code and git history, my name is on it :(
  const formattedIsbn = isbn.replace(/-/, '')
                            .replace(/-/, '')
                            .replace(/-/, '')
                            .replace(/-/, '')
                            .trim()

  try {
    const evaluation = await EvaluationService.evaluateBook(formattedIsbn)
    res.status(200).json(evaluation)
  } catch (error) {
    res.status(500).json('Error') //FIXME improve this
  }
}

module.exports = {
  evaluate
}
