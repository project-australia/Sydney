import idx from 'idx'

export class BookLookup {
  constructor (lookupJsonRepresentation) {
    this.book = lookupJsonRepresentation
  }

  isPaperback () {
    return this.binding === 'Paperback'
  }

  get salesRank () {
    const salesRank = idx(this.book, _ => _.SalesRank[0])
    return Number(salesRank)
  }

  get images () {
    const small = idx(this.book, _ => _.SmallImage[0].URL[0])
    const medium = idx(this.book, _ => _.MediumImage[0].URL[0])
    const large = idx(this.book, _ => _.LargeImage[0].URL[0])

    return {
      small,
      medium,
      large
    }
  }

  get dimensions () {
    const dimensions = idx(
      this.book,
      _ => _.ItemAttributes[0].PackageDimensions[0]
    )

    const height = idx(dimensions, _ => dimensions.Height[0]['_'])
    const length = idx(dimensions, _ => dimensions.Length[0]['_'])
    const width = idx(dimensions, _ => dimensions.Width[0]['_'])
    const weight = idx(dimensions, _ => dimensions.Weight[0]['_'])

    if (!height || !length || !width || !weight) {
      return undefined
    }

    return {
      height: parseFloat(height) / 100,
      length: parseFloat(length) / 100,
      width: parseFloat(width) / 100,
      weight: parseFloat(weight) / 100
    }
  }

  get description () {
    return undefined
  }

  get title () {
    return idx(this.book, _ => _.ItemAttributes[0].Title[0])
  }

  get isbn () {
    return idx(this.book, _ => _.ItemAttributes[0].ISBN[0])
  }

  get binding () {
    return idx(this.book, _ => _.ItemAttributes[0].Binding[0])
  }

  get formattedLowestUsedPrice () {
    return idx(
      this.book,
      _ => _.OfferSummary[0].LowestUsedPrice[0].FormattedPrice[0]
    )
  }

  get lowestUsedPrice () {
    const price = idx(this, _ => _.formattedLowestUsedPrice.substr(1))
    return price && Number(price)
  }

  get price () {
    return this.lowestUsedPrice
  }

  get authors () {
    return idx(this.book, _ => _.ItemAttributes[0].Author)
  }

  get edition () {
    return idx(this.book, _ => _.ItemAttributes[0].Edition)
  }
}
