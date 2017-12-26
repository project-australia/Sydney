import {ClientError} from "../../../../src/clients/clientError";

const request = require('supertest')
const app = require('../../../../src/app')
const EvaluationService = require('../../../../src/services/bookEvaluation')

jest.mock('../../../../src/services/bookEvaluation')

describe('Book evaluation controller', () => {
  const isbn = '9781483358505'

  beforeAll(() => {
    EvaluationService.evaluateBook = jest.fn()
  })

  beforeEach(() => {
    EvaluationService.evaluateBook.mockClear()
  })

  it('should find all some objects', async () => {
    const mockedResponse = { ballardPrice: '10.00', amazonPrice: '12.00' }
    EvaluationService.evaluateBook.mockReturnValue(Promise.resolve(mockedResponse))
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

  xit('should return 404 in case of external error', async () => {
    EvaluationService.evaluateBook.mockReturnValue(Promise.reject(new ClientError('External Error')))

    const response = await request(app).get(`/pricing?isbn=${isbn}`)
    expect(response.statusCode).toEqual(404)
  })
})
