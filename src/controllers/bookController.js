// FIXME: This file is ugly
const EvaluationService = require('../services/bookEvaluation')

const lookup = async (req, res) => {
  const isbn = req.params.isbn

  // FIXME: Please, remove from the code and git history, my name is on it :(
  const formattedIsbn = isbn.replace(/-/, '')
    .replace(/-/, '')
    .replace(/-/, '')
    .replace(/-/, '')
    .trim()

  try {
    const evaluation = await EvaluationService.amazonLookup(formattedIsbn)
    res.status(200).json(evaluation)
  } catch (error) {
    res.status(500).json('Error') //FIXME improve this
    throw error
  }
}

const evaluate = async (req, res) => {
  const isbn = req.params.isbn

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
    throw error
  }
}

module.exports = {
  evaluate,
  lookup
}
