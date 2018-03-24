import {
  orderUpdatedResponse,
  updateOrderStatusRequest
} from '../../../fixture/model/order.fixture'

const request = require('supertest')
const app = require('../../../../src/app')
const { newOrderResponse } = require('../../../fixture/model/order.fixture')
const OrderService = require('../../../../src/services/database/orderService')
const { newSellingOrderRequest, newBuyingOrderRequest } = require('../../../fixture/model/order.fixture')

jest.mock('../../../../src/services/database/orderService')

const userId = newOrderResponse.customerId

describe('Order controller', () => {
  beforeAll(() => {
    OrderService.createSellOrder = jest.fn()
    OrderService.createBuyOrder = jest.fn()
    OrderService.updateOrder = jest.fn()
  })

  it('should create SELLING order for given user', async () => {
    OrderService.createSellOrder.mockReturnValue(newOrderResponse)
    const response = await request(app)
      .post(`/users/${userId}/orders`)
      .send(newSellingOrderRequest)

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(newOrderResponse)
    expect(OrderService.createSellOrder).toHaveBeenCalledWith(newSellingOrderRequest, userId)
  })

  it('should create BUYING order for given user', async () => {
    OrderService.createBuyOrder.mockReturnValue(newOrderResponse)
    const response = await request(app)
      .post(`/users/${userId}/orders`)
      .send(newBuyingOrderRequest)

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(newOrderResponse)
    expect(OrderService.createBuyOrder).toHaveBeenCalledWith(newBuyingOrderRequest, userId)
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
