const { ServiceError } = require('./serviceError')
const _ = require('lodash')
const AmazonClient = require('../clients/amazon')

// TODO: Test this
const amazonLookup = async isbn => {
  return AmazonClient.lookupByISBN(isbn)
}

const evaluateBook = async isbn => {
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
    const authors = book.Author
      ? book.Author
      : getAuthorFromEntireLookup(bookLookUp)
    const images = getImagesFromEntireLookup(bookLookUp)
    const edition = getBookEditionFromEntireLookup(bookLookUp)
    const id = isbn // FIXME: Refactor this
    const description = undefined //  FIXME: we need to grab this from amazon api
    const dimensions = getBookDimensionsFromEntireLookup(bookLookUp)

    return {
      id,
      title,
      price,
      images,
      authors,
      description,
      edition,
      isbn,
      dimensions
    }
  } catch (error) {
    console.error(error)
    throw new ServiceError(error)
  }
}

// TODO: Test scenario for this rule
const lowestUsedPriceOf = book =>
  book.OfferSummary &&
  book.OfferSummary[0].LowestUsedPrice &&
  book.OfferSummary[0].LowestUsedPrice[0].Amount[0]

const cheapestBook = (cheapearBook, currentBook) => {
  // TODO: Test scenario for this rule, Maybe remove this
  if (
    !currentBook.OfferSummary ||
    currentBook.OfferSummary[0].LowestUsedPrice
  ) {
    return cheapearBook
  }
  return lowestUsedPriceOf(cheapearBook) < lowestUsedPriceOf(currentBook)
    ? cheapearBook
    : currentBook
}

// TODO: Test scenario for this rule
const getPrice = book => {
  try {
    return Number(
      book['OfferSummary'][0]['LowestUsedPrice'][0]['FormattedPrice'][0].substr(
        1
      )
    )
  } catch (e) {
    return undefined
  }
}

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

const getAuthorFromEntireLookup = bookLookupResult => {
  const byBookAuthor = book =>
    book.ItemAttributes && book.ItemAttributes[0].Author
  const bookWithAuthors = _.find(bookLookupResult, byBookAuthor)

  if (!bookWithAuthors) {
    return bookWithAuthors
  }

  return bookWithAuthors.ItemAttributes[0].Author
}

const getBookEditionFromEntireLookup = bookLookupResult => {
  const byBookAuthor = book =>
    book.ItemAttributes && book.ItemAttributes[0].Edition
  const bookWithEdition = _.find(bookLookupResult, byBookAuthor)

  if (!bookWithEdition) {
    return bookWithEdition
  }

  return bookWithEdition.ItemAttributes[0].Edition[0]
}

const getBookDimensionsFromEntireLookup = bookLookupResult => {
  const byDimensions = book =>
    book.ItemAttributes && book.ItemAttributes[0].ItemDimensions
  const bookWithDimensions = _.find(bookLookupResult, byDimensions)

  if (!bookWithDimensions) {
    return bookWithDimensions
  }

  const dimensions = bookWithDimensions.ItemAttributes[0].ItemDimensions[0]
  return {
    height: parseFloat(dimensions.Height[0]['_']) / 100,
    length: parseFloat(dimensions.Length[0]['_']) / 100,
    width: parseFloat(dimensions.Width[0]['_']) / 100,
    weight: parseFloat(dimensions.Weight[0]['_']) / 100
  }
}

const getImagesFromEntireLookup = bookLookupResult => {
  const byImages = book =>
    book.SmallImage && book.MediumImage && book.LargeImage
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

module.exports = { evaluateBook, amazonLookup }
