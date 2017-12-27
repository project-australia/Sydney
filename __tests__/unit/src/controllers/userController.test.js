const request = require('supertest')
const app = require('../../../../src/app')
const UserService = require('../../../../src/services/userService')

jest.mock('../../../../src/services/userService')

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
  })

  it('should create a profile for a user', async () => {
    UserService.createProfile.mockReturnValue(expectedProfile)
    const requestBody = {
      id: userId,
      referredBy: 'DUDUZINHO',
      name: 'talhate',
      email: 't@yahoo.com',
      birthDate: '2017/12/30',
      telephone: '1234567890',
      school: 'school of life',
      address: {
        city: 'viana',
        street: 'fighter',
        number: '666',
        zipCode: 'zip',
        state: 'es'
      }
    }

    const expectedCreateProfileParam = {...requestBody, _id: requestBody.id}
    delete expectedCreateProfileParam.id

    const response = await request(app)
      .post(`/users/${userId}/profile`)
      .send(requestBody)

    expect(UserService.createProfile).toHaveBeenCalledWith(expectedCreateProfileParam)
    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(expectedProfile)
  })
})