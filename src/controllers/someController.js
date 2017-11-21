const { createSomeObject, findAllSomeObject } = require('../services/someService')

const create = (req, res) => {
  createSomeObject('Bla bla bla')
  res.status(200).json({message: 'Foobar created'})
}

const findAll = async (req, res) => {
  const listOfSomeObject = await findAllSomeObject()
  res.status(200).json(listOfSomeObject)
}

module.exports = { create, findAll }
