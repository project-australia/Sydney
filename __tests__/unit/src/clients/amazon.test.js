import amazon from 'amazon-product-api'

import { lookupByISBN } from '../../../../src/clients/amazon'
import amazonLookupByISBN from '../../../fixture/amazonLookupByISBN'
import amazonLookupError from '../../../fixture/amazonLookupError'
import { ClientError } from '../../../../src/clients/clientError'

jest.mock('amazon-product-api')

const mockClient = {
  itemLookup: jest.fn(() => Promise.resolve(amazonLookupByISBN))
}

describe('Amazon API client', () => {
  beforeAll(() => {
    amazon.createClient = () => mockClient
  })

  it('should lookup on amazon a book by ISBN', async () => {
    const itemId = '9781483358505'
    const lookup = await lookupByISBN(itemId)
    const expectedParams = {
      itemId,
      idType: 'ISBN',
      ResponseGroup: 'SalesRank,Offers,ItemAttributes'
    }

    expect(lookup).toEqual(amazonLookupByISBN)
    expect(mockClient.itemLookup).toHaveBeenCalledWith(expectedParams)
  })

  xit('should encapsulate an external error into a representation', async () => {
    // TODO: Throwing exception inside an async function behaves a little different
    // I'll figure out late how to properly test this
    mockClient.itemLookup = jest.fn(() => Promise.reject(amazonLookupError))
    const itemId = 'INVALID_ISBN'

    const wrappedException = () => { lookupByISBN(itemId) }
    expect(wrappedException).toThrow(new ClientError(amazonLookupError))
  })
})
