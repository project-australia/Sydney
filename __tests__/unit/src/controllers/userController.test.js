import { createProfileRequestBody } from '../../../fixture/model/user.fixture'

const request = require('supertest')
const app = require('../../../../src/app')
const UserService = require('../../../../src/services/database/userService')
const FirebaseService = require('../../../../src/services/firebase')

jest.mock('../../../../src/services/userService')
jest.mock('../../../../src/services/firebase')

const expectedProfile = {
  id: '2Cbqh6mjOGUkb9Vsu3M42oPJW5V2',
  referId: 'HEBERT_BOLADO',
  referredBy: 'DUDUZINHO',
  name: 'talhate',
  email: 't@yahoo.com',
  birthDate: '2017-12-27T17:00:04.376Z',
  telephone: '1234567890',
  school: 'school of life',
  club: 'NONE',
  role: 'USER',
  address: {
    city: 'viana',
    street: 'fighter',
    number: '666',
    zipCode: 'zip',
    state: 'es'
  }
}
const userId = expectedProfile.id

describe('Configuration controller', () => {
  beforeAll(() => {
    UserService.createProfile = jest.fn()
    UserService.getProfile = jest.fn()
    FirebaseService.createUserWithEmailAndPassword = jest.fn()
  })

  it('should get a user profile', async () => {
    UserService.findById.mockReturnValue(expectedProfile)
    const response = await request(app).get(`/users/${userId}/profile`)

    expect(UserService.findById).toHaveBeenCalledWith(userId)
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(expectedProfile)
  })

  it('should create a profile for a user', async () => {
    UserService.createProfile.mockReturnValue(expectedProfile)

    const response = await request(app)
      .post(`/users/${userId}/profile`)
      .send(createProfileRequestBody)

    expect(UserService.createProfile).toHaveBeenCalledWith(
      createProfileRequestBody,
      userId
    )
    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(expectedProfile)
  })
})
