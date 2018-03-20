import idx from 'idx'

export class BookLookup {
  constructor (lookupJsonRepresentation) {
    this.book = lookupJsonRepresentation
  }

  isPaperBack = () => this.binding === 'Paperback'

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
    const dimensions = idx(this.book, _ => _.ItemAttributes[0].PackageDimensions[0])

    return {
      height: parseFloat(dimensions.Height[0]['_']) / 100,
      length: parseFloat(dimensions.Length[0]['_']) / 100,
      width: parseFloat(dimensions.Width[0]['_']) / 100,
      weight: parseFloat(dimensions.Weight[0]['_']) / 100
    }
  }

  get description () {
    return idx(this.book, _ => _.ItemAttributes[0].Title[0])
  }

  get title () {
    return undefined
  }

  get isbn () {
    return idx(this.book, _ => _.ItemAttributes[0].ISBN[0])
  }

  get binding () {
    return idx(this.book, _ => _.ItemAttributes[0].Binding[0])
  }

  get formattedLowestUsedPrice () {
    return idx(this.book, _ => _.OfferSummary[0].LowestUsedPrice[0].FormattedPrice[0])
  }

  get lowestUsedPrice () {
    return idx(this, _ => _.formattedLowestUsedPrice.substr(1))
  }

  get authors () {
    return idx(this.book, _ => _.Author)
  }

  get edition () {
    return idx(this.book, _ => _.ItemAttributes[0].Edition)
  }
}
