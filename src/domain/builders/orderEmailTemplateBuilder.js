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

const TITLES = {
  BUY: {
    SHIPPING:
      '<p>We’ll let you know as soon as your book(s) have shipped.</p><p>To view your order, please view your account profile under my orders tab.</p>',
    NO_SHIPPING:
      '<p>We’ll contact you as soon as possible to set up a time to deliver. </p><p>To view your order, please view your account profile under my orders tab. </p>'
  },
  SELL: {
    SHIPPING:
      "<p>You’ll receive another email with the prepaid shipping label and instructions/tips on how to package your book(s) so they don't get damaged on the way. </p><p>Once we receive and inspect the book(s) to make sure they're not damaged (as damaged books will be subject to the Terms and Conditions agreed upon), you'll see the amount on the front of the app under My Wallet. You can then withdraw it and it will go to your PayPal or Venmo account. </p><p>To view your order, please view your account profile under my orders tab.</p>",
    NO_SHIPPING:
      "<p>We’ll contact you as soon as possible to set up a time for us to pick up the book(s).</p><p>Once we receive and inspect the book(s) at our location to make sure they're not damaged (as damaged books will be subject to the Terms and Conditions agreed upon), you'll see the amount on the front of the app under My Wallet. You can then withdraw it and it will go to your PayPal or Venmo account. </p><p>To view your order, please view your account profile under my orders tab.</p>"
  }
}

module.exports = {
  OrderEmailTemplateBuilder
}