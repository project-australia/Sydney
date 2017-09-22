import { createSomeObject, findAllSomeObject } from '../services/someService'

export const create = (req, res) => {
  createSomeObject('Bla bla bla')
  res.status(200).json({message: 'Foobar created'})
}

export const findAll = (req, res) => {
  const listOfSomeObject = findAllSomeObject()

  res.status(200).json(listOfSomeObject)
}
