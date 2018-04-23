class Book {
  constructor ({
    id,
    isbn,
    title,
    authors,
    edition,
    images,
    description,
    dimensions,
    prices,
    isbn13
  }) {
    this.id = id
    this.title = title
    this.authors = authors
    this.edition = edition
    this.isbn = isbn
    this.description = description
    this.images = images
    this.dimensions = dimensions
    this.prices = prices
    this.isbn13 = isbn13
  }
}

module.exports = {
  Book
}
