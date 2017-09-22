import SomeModel from '../mongoose/models/someModel'

export function createSomeObject (word) {
  let awesomeInstance = new SomeModel({a_string: word})
  awesomeInstance.save(function (err) {
    if (err) {
      console.log(err)
    }
  })
}

export function findAllSomeObject () {
  SomeModel.find({}, function (err, docs) {
    if (err) {
      console.error(err)
    } else {
      console.log(docs)
    }
  })
}
