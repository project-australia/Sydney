const _ = require('lodash')
const { createOrderTemplate } = require('./orderEmailTemplate')

const toRowItem = (title, price, imageUrl, subTitle, type) => ({
  title: _.startCase(_.toLower(title)),
  price,
  imageUrl,
  subTitle,
  type
})

class OrderEmailTemplateBuilder {
  constructor (order, books) {
    this.order = order
    this.books = books
  }

  get items () {
    const type = this.order.orderType.toLocaleLowerCase()

    return this.books.map(book =>
      toRowItem(
        book.title,
        book.prices[type],
        book.images.small,
        book.condition,
        type
      )
    )
  }

  build () {
    return createOrderTemplate(
      this.order,
      this.items,
      this.order.shippingAddress
    )
  }
}

module.exports = {
  OrderEmailTemplateBuilder
}
