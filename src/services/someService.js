var SomeModel = require('../mongoose/models/someModel')

function createSomeObject (word) {
  var awesomeInstance = new SomeModel({a_string: word})
  awesomeInstance.save(function (err) {
    if (err) {
      console.log(err)
    }
  })
}

function findAllSomeObject () {
  SomeModel.find({}, function (err, docs) {
    if (err) {
      console.error(err)
    } else {
      console.log(docs)
    }
  })
}

exports.createSomeObject = createSomeObject
exports.findAllSomeObject = findAllSomeObject
