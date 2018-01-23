import AmazonClient from '../../../../src/clients/amazon'
import amazonLookupByISBN from '../../../fixture/amazonLookupByISBN'
import { evaluateBook } from '../../../../src/services/bookEvaluation'
jest.mock('../../../../src/clients/amazon')

const bookUnderSalesRankThreshold = 0

describe('Amazon API Service', () => {
  beforeAll(() => {
    AmazonClient.lookupByISBN = jest.avfn()
  })

  it('should return all book\'s information', async () => {
    AmazonClient.lookupByISBN.mockReturnValue(Promise.resolve(amazonLookupByISBN))
    const isbn = '9781483358505'

    const book = await evaluateBook(isbn)

    expect(book.title).toEqual('Fundamentals Of Human Resource Management Functions, Applications, Skill Development')
    expect(book.authors).toEqual(['Robert N. Lussier', 'John R. Hendon'])
    expect(book.edition).toEqual('1')
    expect(book.id).toEqual(isbn)
    expect(book.price).toEqual(null)
    expect(book.images.small).toEqual('https://images-na.ssl-images-amazon.com/images/I/51uSvYiXgyL._SL75_.jpg')
    expect(book.images.medium).toEqual('https://images-na.ssl-images-amazon.com/images/I/51uSvYiXgyL._SL160_.jpg')
    expect(book.images.large).toEqual('https://images-na.ssl-images-amazon.com/images/I/51uSvYiXgyL.jpg')
  })

  it('should evaluate book price by cheapest amazon price', async () => {
    AmazonClient.lookupByISBN.mockReturnValue(Promise.resolve(amazonLookupByISBN))

    const book = await evaluateBook('9781483358505')
    expect(book.price).toEqual(null)
  })

  it('should calculate ballard price if book is above 900 000 on amazon sales rank', async () => {
    AmazonClient.lookupByISBN.mockReturnValue(Promise.resolve([amazonLookupByISBN[bookUnderSalesRankThreshold]]))

    const book = await evaluateBook('9781483358505')
    expect(book.price).toEqual('16.89')
  })
})
