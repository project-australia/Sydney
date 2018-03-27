const { getCustomerEmail } = require('./userService')
const {
  sendShippingLabelTo,
  sendOrderConfirmationEmailTo
} = require('../mailer')
const { saveBooks, changeAvailability } = require('./bookService')
const { generateShippingLabel } = require('../shipping')
const { OrderModel } = require('./models/orderModel')

// FIXME: We have bussiness logic tight with Data Access logic, this isn't good
const createBuyOrder = async (
  customerId,
  items,
  shippingMethod,
  shippingAddress
) => {
  const rentingBooks = items
    .filter(item => item.type === 'RENT')
    .map(item => changeAvailability(item.book.id, 'RENTED'))
  const buyingBooks = items
    .filter(item => item.type === 'BUY')
    .map(item => changeAvailability(item.book.id, 'SOLD'))
  const orderItems = await Promise.all([...buyingBooks, ...rentingBooks])

  const savedOrder = await saveOrder(
    customerId,
    orderItems,
    shippingMethod,
    shippingAddress,
    'BUY'
  )

  const customerEmail = await getCustomerEmail(customerId)
  await sendOrderConfirmationEmailTo(customerEmail, savedOrder)

  return savedOrder
}

const createSellOrder = async (
  customerId,
  items,
  shippingMethod,
  shippingAddress
) => {
  const booksFromItem = items.map(item => item.book)
  const books = await saveBooks(booksFromItem)

  if (shippingMethod === 'SHIPPO') {
    const label = await generateShippingLabel()
    const customerEmail = await getCustomerEmail(customerId)
    sendShippingLabelTo(customerEmail, label.labelUrl)
  }

  return saveOrder(customerId, books, shippingMethod, shippingAddress, 'SELL')
}

const saveOrder = async (
  customerId,
  items,
  shippingMethod,
  shippingAddress,
  orderType
) => {
  const order = {
    customerId,
    items: items.map(book => book.id),
    shippingMethod,
    shippingAddress,
    orderType
  }

  return new OrderModel(order).save()
}

const updateOrder = async (id, status, transactionId) => {
  return OrderModel.findOneAndUpdate(
    { _id: id },
    { $set: { status, transactionId } },
    { new: true }
  )
}

const findAll = async () => {
  return OrderModel.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'customerId',
        foreignField: '_id',
        as: 'user'
      }
    }
    // {
    //   $lookup: {
    //     from: 'books',
    //     let: {'items': '$items'},
    //     pipeline: [
    //       {$match: {
    //         $expr: {
    //           $in: ['$_id', '$$items']
    //         }
    //       }}
    //     ],
    //     as: 'booksList'
    //   }
    // }
    // {
    //   $unwind: '$items'
    // },
    // {
    //   $lookup:
    //     {
    //       from: 'books',
    //       localField: 'items',
    //       foreignField: '_id',
    //       as: 'booksOrdered'
    //     }
    // },
    // {
    //   $match: { 'booksOrdered': { $ne: [] } }
    // }
  ])
}

module.exports = {
  updateOrder,
  createBuyOrder,
  createSellOrder,
  findAll
}

// db.grupos.aggregate([
//   {$lookup:{
//     from:'times'
//    , let:{times:'$times'}
//    , pipeline:[
//     {$match:{
//      $expr:{
//       $in:['$nome','$$times']
//      }
//     }}
//    ]
//    , as: 'times'
//   }}
//  ])
