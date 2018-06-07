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
    this.title = TITLES[order.orderType]
    this.order = order
    this.books = books

    if (order.shippingMethod === 'IN_PERSON') {
      this.headline = HEADLINES[order.orderType].IN_PERSON
    } else {
      this.headline = HEADLINES[order.orderType].SHIPPED
    }
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
      this.order.shippingAddress,
      this.headline,
      this.title
    )
  }
}

const HEADLINES = {
  BUY: {
    SHIPPED:
      "We'll let you know as soon as your book(s) have shipped.<br/>To view your order, please view your account profile under my orders tab.<br/>",
    IN_PERSON:
      "We'll contact you as soon as possible to set up a time to deliver. <br/>To view your order, please view your account profile under my orders tab. <br/>"
  },
  SELL: {
    SHIPPED:
      "You'll receive another email with the prepaid shipping label and instructions/tips on how to package your book(s) so they don't get damaged on the way. <br/>Once we receive and inspect the book(s) to make sure they're not damaged (as damaged books will be subject to the Terms and Conditions agreed upon), you'll see the amount on the front of the app under My Wallet. You can then withdraw it and it will go to your PayPal or Venmo account. <br/>To view your order, please view your account profile under my orders tab.<br/>",
    IN_PERSON:
      "We'll contact you as soon as possible to set up a time for us to pick up the book(s).<br/>Once we receive and inspect the book(s) at our location to make sure they're not damaged (as damaged books will be subject to the Terms and Conditions agreed upon), you'll see the amount on the front of the app under My Wallet. You can then withdraw it and it will go to your PayPal or Venmo account. <br/>To view your order, please view your account profile under my orders tab.<br/>"
  }
}

const TITLES = {
  BUY: 'Thank you for your order!',
  SELL: 'Thank you for selling us your books!'
}

module.exports = {
  OrderEmailTemplateBuilder
}
