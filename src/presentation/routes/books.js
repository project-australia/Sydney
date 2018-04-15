const { Router } = require('express')
const {
  evaluate,
  lookup,
  findBookByParams,
  addNewBooks,
  findBookByIsbn,
  getFeaturedBooks,
  getRecentlyAddedBooks,
  findAllBooks,
  updateABook,
  findBooksByArrayOfIds,
  serachBooksWithPagination
} = require('../controllers/bookController')

const router = Router()

router.post('/', addNewBooks)
router.post('/searchbyids', findBooksByArrayOfIds)
router.put('/:id', updateABook)
router.get('/', findAllBooks)
router.get('/search', findBookByParams)
router.get('/searchPaginated', serachBooksWithPagination)
router.get('/featured', getFeaturedBooks)
router.get('/recentlyAdded', getRecentlyAddedBooks)

router.get('/:isbn', findBookByIsbn)
router.get('/:isbn/evaluation', evaluate)
router.get('/:isbn/lookup', lookup)

module.exports = router
