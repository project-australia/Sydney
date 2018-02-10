const request = require('supertest')
const app = require('../../../../src/app')
const OrderService = require('../../../../src/services/orderService')
const { newOrderResponse } = require('../../../fixture/model/order.fixture')
const { newOrderRequest } = require('../../../fixture/model/order.fixture')

jest.mock('../../../../src/services/orderService')

const userId = newOrderResponse.customerId

describe('Configuration controller', () => {
  beforeAll(() => {
    OrderService.saveOrder = jest.fn()
  })

  it('should get a user profile', async () => {
    OrderService.saveOrder.mockReturnValue(newOrderResponse)
    const response = await request(app)
      .post(`/users/${userId}/orders`)
      .send(newOrderRequest)

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(newOrderResponse)
    expect(OrderService.saveOrder).toHaveBeenCalledWith(newOrderRequest, userId)
  })
})
