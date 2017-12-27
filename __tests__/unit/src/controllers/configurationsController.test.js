const request = require('supertest')
const app = require('../../../../src/app')
const ConfigurationService = require('../../../../src/services/configurations')

jest.mock('../../../../src/services/bookEvaluation')

describe('Configuration controller', () => {
  beforeAll(() => {
    ConfigurationService.getSelling = jest.fn()
    ConfigurationService.setSelling = jest.fn()
  })

  it('should return selling toggle', async () => {
    ConfigurationService.getSelling.mockReturnValue(true)
    const response = await request(app).get(`/configurations/sellings`)

    expect(response.body).toEqual(true)
    expect(response.statusCode).toEqual(200)
    expect(ConfigurationService.getSelling).toHaveBeenCalled()
  })

  it('should change selling toggle', async () => {
    ConfigurationService.setSelling.mockReturnValue(false)
    const response = await request(app).put(`/configurations/sellings`).send({selling: false})

    expect(response.body).toEqual(false)
    expect(response.statusCode).toEqual(200)
    expect(ConfigurationService.setSelling).toHaveBeenCalledWith(false)
  })
})
