export class Book {
  id
  title
  images
  authors
  edition
  isbn
  dimensions
  price

  constructor (id, title, images, authors, edition, isbn, dimensions, price) {
    this.id = id
    this.title = title
    this.images = images
    this.authors = authors
    this.edition = edition
    this.isbn = isbn
    this.dimensions = dimensions
    this.price = price
  }
}
