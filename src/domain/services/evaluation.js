const { AmazonLookupMapper } = require('../mappers/AmazonLookupMapper')
const { AmazonLookup } = require('../entities/amazonLookup')
const { ServiceError } = require('./serviceError')
const AmazonClient = require('../../data/vendors/amazon')

const amazonLookup = async isbn => AmazonClient.lookupByISBN(isbn)

const evaluateBook = async isbn => {
  try {
    const lookup = await AmazonClient.lookupByISBN(isbn)
    const amazonLookup = new AmazonLookup(lookup)
    return AmazonLookupMapper.toBook(amazonLookup)
  } catch (err) {
    throw new ServiceError(err, 404)
  }
}

module.exports = { evaluateBook, amazonLookup }
