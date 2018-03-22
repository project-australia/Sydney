const { AmazonLookupMapper } = require('../domain/mappers/AmazonLookupMapper')
const { AmazonLookup } = require('../domain/entities/amazonLookup')
const { ServiceError } = require('./serviceError')
const AmazonClient = require('./amazon')

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
