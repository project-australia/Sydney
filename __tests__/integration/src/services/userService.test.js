import {
  createProfile,
  eraseCollection,
  findById,
  updateProfile,
  mapToMongoose
} from '../../../../src/services/userService'
import {closeDBConnection, connectDB} from '../config/integrationTest'

const address = {
  city: 'Viana',
  street: 'fighter',
  number: '666',
  zipCode: 'Zip',
  state: 'ES'
}

export const userProfile = {
  id: '2Cbqh6mjOGUkb9Vsu3M42oPJW5V2',
  _id: '2Cbqh6mjOGUkb9Vsu3M42oPJW5V2',
  referredBy: 'DUDUZINHO',
  name: 'TALHATE',
  email: 't@yahoo.com',
  birthDate: new Date(),
  telephone: '1234567890',
  school: 'School of Life',
  address: address
}

const newAddress = {
  city: 'Toronto',
  street: 'mortal kombat',
  number: '000',
  zipCode: '123456',
  state: 'SP'
}
export const updateUserProfile = {
  telephone: '9999999',
  school: 'School of Rock',
  address: newAddress
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
    expect(savedUser.id).toEqual(userProfile.id)
  })

  it('should retrieve an user profile by Id', async () => {
    await createProfile(userProfile)
    const user = await findById(userProfile.id)
    expect(user).toBeDefined()
  })

  it('should map external representation into mongoose one', async () => {
    const mappedProfile = mapToMongoose(userProfile)
    expect(mappedProfile.referId).toEqual(userProfile.email)
    expect(mappedProfile._id).toEqual(userProfile.id)
  })

  it('should update an user profile by Id', async () => {
    await createProfile(userProfile)
    const updatedUser = await updateProfile(userProfile.id, updateUserProfile)
    expect(updatedUser.telephone).toEqual(updateUserProfile.telephone)
    expect(updatedUser.school).toEqual(updateUserProfile.school)
    expect(updatedUser.address.city).toEqual(newAddress.city)
  })
})
