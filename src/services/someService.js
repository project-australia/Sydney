const SomeModel = require('../mongoose/models/someModel')

const ALL = {}

async function createSomeObject (word) {
  let awesomeInstance = new SomeModel({a_string: word})
  await awesomeInstance.save()
}

async function findAllSomeObject () {
  return SomeModel.find(ALL)
}

module.exports = { createSomeObject, findAllSomeObject }
