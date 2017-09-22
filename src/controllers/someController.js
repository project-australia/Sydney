var someService = require('../services/someService')

exports.create = function (req, res) {
  someService.createSomeObject('Bla bla bla')
  res.status(200).json({message: 'Foobar created'})
}

exports.findAll = function (req, res) {
  var listOfSomeObject = someService.findAllSomeObject()

  res.status(200).json(listOfSomeObject)
}
