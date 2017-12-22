import { getEvaluationPrice } from '../../../../src/clients/amazon'
import amazonLookupByISBN from '../../../fixture/amazonLookupByISBN'

import dotenv from 'dotenv'

describe('Amazon API client', () => {
  beforeAll(() => {
    dotenv.config()
  })

  it('should lookup book price by ISBN', async () => {
    const price = await getEvaluationPrice('9781483358505')
    console.log(JSON.stringify(price))
  })
})
