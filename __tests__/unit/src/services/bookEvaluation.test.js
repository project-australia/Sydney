import AmazonClient from '../../../../src/services/amazon'
import amazonLookupByISBN from '../../../fixture/amazonLookup/amazonLookupByISBN'
import { evaluateBook } from '../../../../src/services/evaluation'
import { ServiceError } from '../../../../src/services/serviceError'
jest.mock('../../../../src/services/amazon')

const bookUnderSalesRankThreshold = 0

describe('Amazon API Service', () => {
  beforeAll(() => {
    AmazonClient.lookupByISBN = jest.fn()
  })

  it("should return all book's information", async () => {
    AmazonClient.lookupByISBN.mockReturnValue(
      Promise.resolve(amazonLookupByISBN)
    )
    const isbn = '9781483358505'

    const book = await evaluateBook(isbn)

    expect(book.title).toEqual(
      'Fundamentals Of Human Resource Management Functions, Applications, Skill Development'
    )
    expect(book.authors).toEqual(['Robert N. Lussier', 'John R. Hendon'])
    expect(book.edition).toEqual('1')
    expect(book.price.sell).toEqual(null)
    expect(book.images.small).toEqual(
      'https://images-na.ssl-images-amazon.com/images/I/51uSvYiXgyL._SL75_.jpg'
    )
    expect(book.images.medium).toEqual(
      'https://images-na.ssl-images-amazon.com/images/I/51uSvYiXgyL._SL160_.jpg'
    )
    expect(book.images.large).toEqual(
      'https://images-na.ssl-images-amazon.com/images/I/51uSvYiXgyL.jpg'
    )
    expect(book.dimensions.height).toEqual(0.73)
    expect(book.dimensions.length).toEqual(8.43)
    expect(book.dimensions.width).toEqual(5.85)
    expect(book.dimensions.weight).toEqual(0.79)
  })

})
