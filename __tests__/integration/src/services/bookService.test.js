import { saveBook, eraseCollection } from '../../../../src/services/bookService'
import { closeDBConnection, connectDB } from '../config/integrationTest'

export const aBook = {
  sellingPrice: 15.5,
  buyingPrice: 13.5,
  title: 'O Capital',
  authors: ['Karl Max', 'Eduardo Moroni'],
  isbn: '1234567890',
  edition: 'A primeira',
  images: {
    small: 'www.yyy.xxx',
    medium: 'www.aaa.com',
    large: 'www.bbb.io'
  }
}

describe('Book integration tests', () => {
  beforeAll(async () => {
    await connectDB()
  })

  afterAll(() => {
    closeDBConnection()
  })

  beforeEach(async () => {
    await eraseCollection(true)
  })

  it('should save a book to DB', async () => {
    const savedbook = await saveBook(aBook)
    expect(savedbook.id).toBeDefined()
    expect(savedbook.status).toEqual('UNAVAILABLE')
    expect(savedbook.images).toEqual(aBook.images)
  })
})
