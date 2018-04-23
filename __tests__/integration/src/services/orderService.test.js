import {
  saveOrder,
  updateOrder
} from '../../../../src/data/repositories/ordersRepository'
import { connectDB } from '../config/integrationTest'
import { userProfile } from './userService.test'
import { saveBook } from '../../../../src/data/repositories/booksRepository'
import { createProfile } from '../../../../src/data/repositories/usersRepository'
import { aBook } from '../../../fixture/model/book.fixture'

describe('Order service integration tests', () => {
  beforeAll(async () => {
    await connectDB()
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

  it.skip('should update order status', async () => {
    updateOrder('ORDER_ID', 'STATUS')
  })
})
