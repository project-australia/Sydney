const request = require('supertest')
const app = require('../../../../src/app')
jest.mock('../../../../src/services/bookEvaluation')
const EvaluationService = require('../../../../src/services/bookEvaluation')

describe('Book evaluation controller', () => {
  const isbn = '9781483358505'

  beforeEach(() => {
    EvaluationService.evaluateBook.mockClear()
  })

  it('should find all some objects', async () => {
    const mockedResponse = { ballardPrice: '10.00', amazonPrice: '12.00' }
    EvaluationService.evaluateBook = jest.fn(() => Promise.resolve(mockedResponse))
    const response = await request(app).get(`/pricing?isbn=${isbn}`)

    expect(EvaluationService.evaluateBook).toHaveBeenCalledWith(isbn)
    expect(response.body).toEqual(mockedResponse)
    expect(response.statusCode).toEqual(200)
  })

  it('should treat invalid ISBN as BAD_REQUEST', async () => {
    const isbn = 'INVALID'
    const response = await request(app).get(`/pricing?isbn=${isbn}`)

    expect(EvaluationService.evaluateBook).toHaveBeenCalledTimes(0)
    expect(response.statusCode).toEqual(400)
  })
})
