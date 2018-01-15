import { saveOrder, eraseCollection } from '../../../../src/services/orderService'
import { closeDBConnection, connectDB } from '../config/integrationTest'
import { aBook } from './bookService.test'
import { userProfile } from './userService.test'
import {saveBook} from "../../../../src/services/bookService";
import {createProfile} from "../../../../src/services/userService";

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

  it('should save an order to DB', async () => {
    const savedbook = await saveBook(aBook)
    const savedUser = await createProfile(userProfile)

    const anOrder = {
      customerId: savedUser,
      type: 'RENT',
      items: [savedbook]
    }

    const savedOrder = await saveOrder(anOrder)

    expect(savedOrder.id).toBeDefined()
    expect(savedOrder.customerId).toEqual(savedUser.id)
    expect(savedOrder.type).toEqual(anOrder.type)
  })
})
