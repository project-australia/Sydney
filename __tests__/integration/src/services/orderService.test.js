import {
  saveOrder,
  eraseCollection
} from '../../../../src/services/orderService'
import { connectDB } from '../config/integrationTest'
import { userProfile } from './userService.test'
import { saveBook } from '../../../../src/services/bookService'
import { createProfile } from '../../../../src/services/userService'
import { aBook } from '../../../fixture/model/book.fixture'

describe('Order integration tests', () => {
  beforeAll(async () => {
    await connectDB()
  })

  beforeEach(async () => {
    await eraseCollection(true)
  })

  const address = {
    city: 'viana',
    street: 'fighter',
    number: '666',
    zipCode: 'zip',
    state: 'es'
  }

  it('should save an order to DB', async () => {
    const savedbook = await saveBook(aBook)
    const savedUser = await createProfile(userProfile)

    const anOrder = {
      customerId: userProfile.id,
      transactionId: 'some-random-id',
      orderType: 'RENT',
      shippingMethod: 'SHIPPED',
      items: [savedbook],
      shippingAddress: address
    }

    const savedOrder = await saveOrder(anOrder)

    expect(savedOrder.id).toBeDefined()
    expect(savedOrder.customerId).toEqual(savedUser.id)
    expect(savedOrder.orderType).toEqual(anOrder.orderType)
    expect(savedOrder.transactionId).toEqual(anOrder.transactionId)
    expect(savedOrder.shippingAddress).toEqual(address)
  })
})
