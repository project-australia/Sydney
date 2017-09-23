import { findAllSomeObject } from '../../../../src/services/someService'
import { initConfigurations } from '../../../../src/config'
import { closeConnection } from '../../../../src/config/mongoose'

describe('Some service integration test', () => {
  beforeAll(() => {
    initConfigurations()
  })

  afterAll(() => {
    closeConnection()
  })

  it('should find all some object from DB', async () => {
    const someObjects = await findAllSomeObject()
    expect(someObjects.length).toBeGreaterThan(0)
  })
})
