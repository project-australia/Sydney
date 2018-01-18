import { saveOrder, eraseCollection } from '../../../../src/services/orderService'
import { closeDBConnection, connectDB } from '../config/integrationTest'
import { aBook } from './bookService.test'
import { userProfile } from './userService.test'
import {saveBook} from '../../../../src/services/bookService'
import {createProfile} from '../../../../src/services/userService'

describe('Order integration tests', () => {
  beforeAll(async () => {
    await connectDB()
  })

  afterAll(() => {
    closeDBConnection()
  })

  beforeEach(async () => {
    await eraseCollection(true)
  })

  const address = {city: 'Viana', street: 'fighter', number: '666', zipCode: 'Zip', state: 'ES'}
  const addressExpected = {city: 'viana', street: 'fighter', number: '666', zipCode: 'zip', state: 'es'}

  it('should save an order to DB', async () => {
    const savedbook = await saveBook(aBook)
    const savedUser = await createProfile(userProfile)

    const anOrder = {
      customerId: savedUser,
      trackingPaymentId: 'some-random-id',
      type: 'RENT',
      items: [savedbook],
      shippingAdress: address
    }

    const savedOrder = await saveOrder(anOrder)

    expect(savedOrder.id).toBeDefined()
    expect(savedOrder.customerId).toEqual(savedUser.id)
    expect(savedOrder.type).toEqual(anOrder.type)
    expect(savedOrder.trackingPaymentId).toEqual(anOrder.trackingPaymentId)
    expect(savedOrder.shippingAdress).toEqual(addressExpected)
  })
})
