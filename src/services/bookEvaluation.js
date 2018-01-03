const { ServiceError } = require('./serviceError')
const _ = require('lodash')
const AmazonClient = require('../clients/amazon')

const byEAN = isbn => lookup => {
  const { ItemAttributes } = lookup
  const thereIsEANField = () => ItemAttributes[0].EAN
  const isSameIsbn = () => lookup.ItemAttributes[0].EAN[0] === isbn
  return thereIsEANField() ? isSameIsbn() : false
}

const lowestUsedPriceOf = book =>
  book.OfferSummary[0].LowestUsedPrice[0].Amount[0]

const cheapestBook = (cheapearBook, currentBook) =>
  lowestUsedPriceOf(cheapearBook) < lowestUsedPriceOf(currentBook) ? cheapearBook : currentBook

const getPrice = book =>
  Number(book['OfferSummary'][0]['LowestUsedPrice'][0]['FormattedPrice'][0].substr(1))

const ballardPricePercetage = book => {
  const salesRank = book['SalesRank'][0]
  if (salesRank < 600000) {
    return 0.25
  } else if (salesRank < 900000) {
    return 0.2
  } else {
    return null
  }
}

const userDiscout = () => {
  // If a user is 10% member or 20% member, this is the place to put code.
  return 1
}

const calculateBallardPrice = (amazonPrice, ballardPercentage) => {
  if (!ballardPercentage) {
    return null
  }

  return Number(amazonPrice * ballardPercentage * userDiscout()).toFixed(2)
}

const getAuthorFromEntireLookup = (bookLookupResult) => {
  const byBookAuthor = book => book.ItemAttributes && book.ItemAttributes[0].Author
  const bookWithAuthors = _.find(bookLookupResult, byBookAuthor)

  if (!bookWithAuthors) {
    return bookWithAuthors
  }

  const authors = bookWithAuthors.ItemAttributes[0].Author
  return authors
}

const getBookEditionFromEntireLookup = (bookLookupResult) => {

  const byBookAuthor = book => book.ItemAttributes && book.ItemAttributes[0].Edition
  const bookWithEdition = _.find(bookLookupResult, byBookAuthor)

  if (!bookWithEdition) {
    return bookWithEdition
  }

  const edition = bookWithEdition.ItemAttributes[0].Edition[0]
  return edition
}

const getImagesFromEntireLookup = (bookLookupResult) => {
  const byImages = book => book.SmallImage && book.MediumImage && book.LargeImage
  const bookWithImages = _.find(bookLookupResult, byImages)

  if (!bookWithImages) {
    return bookWithImages
  }

  return {
    small: bookWithImages.SmallImage[0].URL[0],
    medium: bookWithImages.MediumImage[0].URL[0],
    large: bookWithImages.LargeImage[0].URL[0]
  }
}

const evaluateBook = async (isbn) => {
  const bookLookUp = await AmazonClient.lookupByISBN(isbn)

  try {
    // FIXME: This should be a filter by paperback
    // const filteredByEAN = bookLookUp.filter(byEAN(isbn))

    // if (filteredByEAN.length === 0) {
    //   throw new Error('Cannot find isbn inside amazon lookup')
    // }

    const bestOffer = bookLookUp.reduce(cheapestBook) // FIXME: Reduce by highest salesrank
    const ballardPercentage = ballardPricePercetage(bestOffer)
    const amazonPrice = getPrice(bestOffer)
    const price = calculateBallardPrice(amazonPrice, ballardPercentage)

    const book = bestOffer.ItemAttributes[0]
    const title = book.Title[0]
    const authors = book.Author ? book.Author[0] : getAuthorFromEntireLookup(bookLookUp)
    const images = getImagesFromEntireLookup(bookLookUp)
    const edition = getBookEditionFromEntireLookup(bookLookUp)
    const id = isbn // FIXME: Refactor this
    const description = undefined //  FIXME: we need to grab this from amazon api

    return {
      id,
      title,
      price,
      images,
      authors,
      description,
      edition
    }
  } catch (error) {
    console.error(error)
    throw new ServiceError(error)
  }
}

module.exports = { evaluateBook }

// If rank 1 - 600, 000 on Amazon
// buy for 25 % of lowest price on Amazon
// If rank 600, 001 - 900, 000 on Amazon
// buy for 20 % of lowest price on Amazon

// After a books is scanned, a non - member will see
// For example:
// For book 9781483358505 Fundamentals of Human Resource Management,
// we are buying it for $18.28(25 % of current lowest price of 69.14 + 3.98 shipping)
// the price of the book($18.28)
// It should also show the 10 % More Club amount of $20.11 with the invitation to sign up

// After a books is scanned, a 10 % member will see
// For example:
// For book 9781483358505 Fundamentals of Human Resource Management we are buying it for $18.28(25 % of current lowest price of 69.14 + 3.98 shipping)
// the price of the book($18.28)
// It should also show the 10 % More Club amount of $20.11
// An invitation to 20 % More Club should say something like
// Get More for yours books here’s how

// After a books is scanned, a 20 % member will see
// For example:
// For book 9781483358505 Fundamentals of Human Resource Management we are buying it for $18.28(25 % of current lowest price of 69.14 + 3.98 shipping)
// the price of the book($18.28)
// It should also show the 20 % More Club amount of $21.94
// It should also show the invitation to sign up to be a rep
