const { ServiceError } = require('./serviceError')
const _ = require('lodash')
const AmazonClient = require('./amazon')

const amazonLookup = async isbn => {
  return AmazonClient.lookupByISBN(isbn)
}

const byHasLowestUsedPriceField = book =>
  book.OfferSummary &&
  book.OfferSummary[0].LowestUsedPrice &&
  book.OfferSummary[0].LowestUsedPrice[0].Amount[0]

const byLowestUsedPrice = (acc, element) => {
  const accPriceAmount = acc.OfferSummary[0].LowestUsedPrice[0].Amount;
  const elementPriceAmount = element.OfferSummary[0].LowestUsedPrice[0].Amount;
  return Number(accPriceAmount) < Number(elementPriceAmount) ? acc : element
};

const evaluateBook = async isbn => {
  let bookLookUp = []

  try {
    bookLookUp = await AmazonClient.lookupByISBN(isbn)
  } catch (err) {
    throw new ServiceError(new Error('ISBN Not Found'), 404)
  }

  try {
    const filteredByLowestUsedPriceField = bookLookUp.filter(byHasLowestUsedPriceField)
    const bestOffer = filteredByLowestUsedPriceField.reduce(byLowestUsedPrice, filteredByLowestUsedPriceField[0])
    const ballardPercentage = ballardPricePercetage(bestOffer)
    const amazonPrice = getPrice(bestOffer)
    const price = {
      sell: calculateBallardPrice(amazonPrice, ballardPercentage)
    }

    const book = bestOffer.ItemAttributes[0]
    const title = book.Title[0]
    const authors = book.Author
      ? book.Author
      : getAuthorFromEntireLookup(bookLookUp)
    const images = getImagesFromEntireLookup(bookLookUp)
    const edition = getBookEditionFromEntireLookup(bookLookUp)
    const description = undefined //  FIXME: we need to grab this from amazon api
    const dimensions = getBookDimensionsFromEntireLookup(bookLookUp)

    return {
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
    throw new ServiceError(error)
  }
}

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

const calculateBallardPrice = (amazonPrice, ballardPercentage) => {
  if (!ballardPercentage) {
    return null
  }

  return Number(amazonPrice * ballardPercentage).toFixed(2)
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
