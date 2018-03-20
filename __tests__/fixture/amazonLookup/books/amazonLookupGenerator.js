import PaperBackBook from './paperback'

export class BookLookupBuilder {
  constructor () {
    this.book = Object.assign({}, PaperBackBook)
  }

  build () {
    return this.book
  }

  withSalesRank (salesRank) {
    this.book.SalesRank = [ String(salesRank) ]
    return this
  }

  withLowestPrice (price) {
    const formattedPrice = `$${Number(price).toFixed(2)}`
    const amount = String(price)

    const lowestUsedPrice = this.book.OfferSummary[0].LowestUsedPrice[0]
    lowestUsedPrice.FormattedPrice = [ formattedPrice ]
    lowestUsedPrice.Amount = [ amount ]

    const bookPrice = this.book.Offers[0].Offer[0].OfferListing[0].Price[0]
    bookPrice.FormattedPrice = formattedPrice
    bookPrice.Amount = amount

    return this
  }
}
