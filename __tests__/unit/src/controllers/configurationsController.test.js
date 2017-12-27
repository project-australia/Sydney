const request = require('supertest')
const app = require('../../../../src/app')
const ConfigurationService = require('../../../../src/services/configurations')

jest.mock('../../../../src/services/bookEvaluation')

describe('Configuration controller', () => {
  beforeAll(() => {
    ConfigurationService.getSelling = jest.fn()
  })

  it('should return selling toggle', async () => {
    ConfigurationService.getSelling.mockReturnValue(true)
    const response = await request(app).get(`/configurations/sellings`)

    expect(response.body).toEqual(true)
    expect(response.statusCode).toEqual(200)
    expect(ConfigurationService.getSelling).toHaveBeenCalled()
  })
})
