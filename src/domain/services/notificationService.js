const OrderRepository = require('../../data/repositories/ordersRepository')
const UsersRepository = require('../../data/repositories/usersRepository')
const MailingService = require('../services/orderMailingService')

const sellingOrderNotification = async (customerId, items, shippingMethod) => {
  if (shippingMethod === 'SHIPPO') {
    try {
      const user = await UsersRepository.findById(customerId)
      await MailingService.sendLabelRequestEmail(user, items)
    } catch (err) {
      console.err(err)
      // TODO: Nesse caso ainda nao temos a order, possivelmente precisamos passar um parametro
      // para proxima funcao dizendo que já falho ao enviar email
      // await markOrderAsEmailFailure()
    }
  }
}

const orderConfirmNotification = async (customerId, order, items) => {
  try {
    const customerEmail = await UsersRepository.getCustomerEmail(customerId)
    await MailingService.sendOrderConfirmationEmailTo(customerEmail, order, items)
  } catch (err) {
    await OrderRepository.markOrderAsEmailFailure(order)
    console.error('Error to retrieve user email', err)
  }
}

module.exports = {
  sellingOrderNotification,
  orderConfirmNotification
}
