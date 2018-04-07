const { createOrderTemplate } = require('../assets/orderEmailTemplate')

const toRowItem = (title, price, imageUrl, subTitle) => ({
  title,
  price,
  imageUrl,
  subTitle
})

class OrderEmailTemplateBuilder {
  constructor(order, books) {
    this.order = order
    this.books = books

    console.log('ORDER: ', order)
    console.log('BOOKS: ', books)
  }

  get items() {
    return this.books.map(book =>
      toRowItem(book.title, book.prices.sell, book.images.small, book.condition)
    )
  }

  build() {
    return createOrderTemplate(this.order, this.items, this.order.shippingAddress)
  }
}

module.exports = {
  OrderEmailTemplateBuilder
}
