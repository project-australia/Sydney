class Prices {
  constructor ({ sell, buy, rent }) {
    this.sell = sell && Number(sell.toFixed(2))
    this.buy = buy
    this.rent = rent
  }
}

module.exports = {
  Prices
}
