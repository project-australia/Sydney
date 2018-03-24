import amazon from 'amazon-product-api'

import { lookupByISBN } from '../../../../src/services/amazon'
import amazonLookupByISBN from '../../../fixture/amazonLookup/amazonLookupByISBN'

jest.mock('amazon-product-api')

const mock = {
  itemLookup: jest.fn()
}

describe('Amazon API client', () => {
  beforeAll(() => {
    amazon.createClient = () => mock
  })

  it('should lookup on amazon a book by ISBN', async () => {
    mock.itemLookup.mockReturnValue(Promise.resolve(amazonLookupByISBN))
    const itemId = '9781483358505'

    const lookup = await lookupByISBN(itemId)
    const expectedParams = {
      itemId,
      idType: 'ISBN',
      ResponseGroup: 'SalesRank,Offers,ItemAttributes,Images'
    }

    expect(lookup).toEqual(amazonLookupByISBN)
    expect(mock.itemLookup).toHaveBeenCalledWith(expectedParams)
  })
})
