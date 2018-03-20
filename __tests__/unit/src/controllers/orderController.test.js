import {
  orderUpdatedResponse,
  updateOrderStatusRequest
} from '../../../fixture/model/order.fixture'

const request = require('supertest')
const app = require('../../../../src/app')
const OrderService = require('../../../../src/services/database/orderService')
const { newOrderResponse } = require('../../../fixture/model/order.fixture')
const { newOrderRequest } = require('../../../fixture/model/order.fixture')

jest.mock('../../../../src/services/orderService')

const userId = newOrderResponse.customerId

describe('Configuration controller', () => {
  beforeAll(() => {
    OrderService.saveOrder = jest.fn()
    OrderService.updateOrder = jest.fn()
  })

  it('should create new order for given user', async () => {
    OrderService.saveOrder.mockReturnValue(newOrderResponse)
    const response = await request(app)
      .post(`/users/${userId}/orders`)
      .send(newOrderRequest)

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(newOrderResponse)
    expect(OrderService.saveOrder).toHaveBeenCalledWith(newOrderRequest, userId)
  })

  it('should update order for given user', async () => {
    OrderService.updateOrder.mockReturnValue(orderUpdatedResponse)
    const response = await request(app)
      .put(`/users/${userId}/orders/${orderUpdatedResponse.id}`)
      .send(updateOrderStatusRequest)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(orderUpdatedResponse)
    expect(OrderService.updateOrder).toHaveBeenCalledWith(
      orderUpdatedResponse.id,
      updateOrderStatusRequest.status,
      updateOrderStatusRequest.transactionId
    )
  })
})
