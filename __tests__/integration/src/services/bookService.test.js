import {
  saveBook,
  eraseCollection,
  findBooksByAuthorOrIsnbOrTitle,
  findRecentlyAddedBooks,
  findFeaturedBooks
} from '../../../../src/services/bookService'
import { closeDBConnection, connectDB } from '../config/integrationTest'
import { aBook } from '../../../fixture/model/book.fixture'

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

  it.only('should save a book to DB', async () => {
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
    const searchAuthor = await findBooksByAuthorOrIsnbOrTitle(
      searchParam.author
    )
    const searchTitle = await findBooksByAuthorOrIsnbOrTitle(searchParam.title)

    expect(savedbookForSearch.id).toBeDefined()
    expect(searchIsbn[0].isbn).toEqual(searchParam.isbn)
    expect(searchAuthor[0].authors).toEqual(
      expect.arrayContaining([searchParam.author.toLowerCase()])
    )
    expect(searchTitle[0].title).toEqual(searchParam.title.toLowerCase())
  })

  it('should return 20 recently added books', async () => {
    for (let i = 0; i < 22; i++) {
      const bookRecentlyTruthy = aBook
      bookRecentlyTruthy.status = 'AVAILABLE'
      await saveBook(bookRecentlyTruthy)
    }
    const recentlyBooks = await findRecentlyAddedBooks()
    expect(recentlyBooks[0].isbn).toEqual(searchParam.isbn)
    expect(recentlyBooks).toHaveLength(20)
  })

  it('should return all featured books', async () => {
    for (let i = 0; i < 5; i++) {
      const bookFeaturedTruthy = aBook
      bookFeaturedTruthy.featured = true
      bookFeaturedTruthy.status = 'AVAILABLE'
      await saveBook(bookFeaturedTruthy)
    }
    const recentlyBooks = await findFeaturedBooks()
    expect(recentlyBooks).toHaveLength(5)
  })
})
