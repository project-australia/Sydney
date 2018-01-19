import { saveBook, eraseCollection, findBooksByAuthorOrIsnbOrTitle } from '../../../../src/services/bookService'
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
  },
  bookCondition: 'Used – Acceptable'
}

const searchParam = {
  title: 'O Capital',
  author: 'Karl Max',
  isbn: '1234567890'
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
    expect(savedbook.featured).toBeFalsy()
    expect(savedbook.images).toEqual(aBook.images)
    expect(savedbook.bookCondition).toEqual(aBook.bookCondition)
  })

  it('should find a books for isbn, author or name', async () => {
    const savedbookForSearch = await saveBook(aBook)
    const searchIsbn = await findBooksByAuthorOrIsnbOrTitle(searchParam.isbn)
    const searchAuthor = await findBooksByAuthorOrIsnbOrTitle(searchParam.author)
    const searchTitle = await findBooksByAuthorOrIsnbOrTitle(searchParam.title)

    expect(savedbookForSearch.id).toBeDefined()
    expect(searchIsbn[0].isbn).toEqual(searchParam.isbn)
    expect(searchAuthor[0].authors).toEqual(expect.arrayContaining([searchParam.author.toLowerCase()]))
    expect(searchTitle[0].title).toEqual(searchParam.title.toLowerCase())
  })
})
