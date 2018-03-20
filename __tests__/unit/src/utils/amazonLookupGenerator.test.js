import { BookLookupBuilder } from '../../../fixture/amazonLookup/books/amazonLookupGenerator'

describe('Book Lookup Builder', () => {
  it('should create a book with desired sales rank', () => {
    const desiredSalesRank = 1000
    const book = new BookLookupBuilder().withSalesRank(desiredSalesRank).build()
    expect(book.SalesRank[0]).toEqual(String(desiredSalesRank))
  })

  it('should create a book with desired lowest used price', () => {
    const desiredLowestPrice = 15.22
    const formattedPrice = `$${Number(desiredLowestPrice).toFixed(2)}`
    const book = new BookLookupBuilder().withLowestPrice(desiredLowestPrice).build()

    const lowestUsedPrice = book.OfferSummary[0].LowestUsedPrice[0]
    expect(lowestUsedPrice.Amount[0]).toEqual(String(desiredLowestPrice))
    expect(lowestUsedPrice.FormattedPrice[0]).toEqual(String(formattedPrice))

    const bookPrice = book.Offers[0].Offer[0].OfferListing[0].Price[0]
    expect(bookPrice.Amount).toEqual(String(desiredLowestPrice))
    expect(bookPrice.FormattedPrice).toEqual(String(formattedPrice))
  })

  it('should chain builder methods', () => {
    const desiredLowestPrice = 15.22
    const desiredSalesRank = 1000

    const book = new BookLookupBuilder().withSalesRank(desiredSalesRank).withLowestPrice(desiredLowestPrice).build()

    const bookPrice = book.Offers[0].Offer[0].OfferListing[0].Price[0]
    expect(bookPrice.Amount).toEqual(String(desiredLowestPrice))

    expect(book.SalesRank[0]).toEqual(String(desiredSalesRank))
  })
})
