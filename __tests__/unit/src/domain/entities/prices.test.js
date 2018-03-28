import { Prices } from '../../../../../src/domain/entities/'

describe('Prices Domain Object', () => {
  it('should return sell price as null when book is not desired for ballards', () => {
    const prices = new Prices({ sell: undefined })
    expect(prices.sell).toEqual(undefined)
  })

  it('should truncate sell value to 2 decimals', () => {
    const prices = new Prices({ sell: 15.231523981273102397 })
    expect(prices.sell).toEqual(15.23)
  })
})
