import { createProfile, eraseCollection, mapToMongoose } from '../../../../src/services/userService'
import { closeDBConnection, connectDB } from '../config/integrationTest'

const address = {city: 'Viana', street: 'fighter', number: '666', zipCode: 'Zip', state: 'ES'}
const userProfile = {
  id: '2Cbqh6mjOGUkb9Vsu3M42oPJW5V2',
  referredBy: 'DUDUZINHO',
  name: 'TALHATE',
  email: 't@yahoo.com',
  birthDate: new Date(),
  telephone: '1234567890',
  school: 'School of Life',
  address: address
}

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
    const savedUser = await createProfile(userProfile)
    expect(savedUser.id).toEqual(userProfile._id)
  })

  it('should map external representation into mongoose one', async () => {
    const mappedProfile = mapToMongoose(userProfile)
    expect(mappedProfile.referId).toEqual(userProfile.email)
    expect(mappedProfile._id).toEqual(userProfile.id)
  })
})
