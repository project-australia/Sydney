import { createProfile, eraseCollection } from '../../../../src/services/userService'
import { closeDBConnection, connectDB } from '../config/integrationTest'

describe('User profile integration tests', () => {
  beforeAll(async () => {
    await connectDB()
  })

  afterAll(() => {
    closeDBConnection()
  })

  beforeEach(async () => {
    await eraseCollection(true)
  })

  it('should save an User profile to DB', async () => {
    const address = {city: 'Viana', street: 'fighter', number: '666', zipCode: 'Zip', state: 'ES'}
    const desiredUser = {
      _id: '2Cbqh6mjOGUkb9Vsu3M42oPJW5V2',
      referId: 'HEBERT_BOLADO',
      referredBy: 'DUDUZINHO',
      name: 'TALHATE',
      email: 't@yahoo.com',
      birthDate: new Date(),
      telephone: '1234567890',
      school: 'School of Life',
      address: address
    }

    const savedUser = await createProfile(desiredUser)
    expect(savedUser.id).toEqual(desiredUser._id)
  })

  it('should create a referId before inserting', () => {
    expect(false).toEqual(true)
  })
})
