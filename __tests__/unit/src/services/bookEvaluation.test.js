import AmazonClient from '../../../../src/clients/amazon'
import amazonLookupByISBN from '../../../fixture/amazonLookupByISBN'
import { evaluateBook } from '../../../../src/services/bookEvaluation'
jest.mock('../../../../src/clients/amazon')

const bookUnderSalesRankThreshold = 0

describe('Amazon API Service', () => {
  beforeAll(() => {
    AmazonClient.lookupByISBN = jest.fn()
  })

  it('should evaluate book price by cheapest amazon price', async () => {
    AmazonClient.lookupByISBN.mockReturnValue(Promise.resolve(amazonLookupByISBN))

    const result = await evaluateBook('9781483358505')
    expect(result.ballardPrice).toEqual(null)
    expect(result.amazonPrice).toEqual('64.27')
  })

  it('should calculate ballard price if book is above 900 000 on amazon sales rank', async () => {
    AmazonClient.lookupByISBN.mockReturnValue(Promise.resolve([amazonLookupByISBN[bookUnderSalesRankThreshold]]))

    const result = await evaluateBook('9781483358505')
    expect(result.amazonPrice).toEqual('69.04')
    expect(result.ballardPrice).toEqual('17.26')
  })
})
