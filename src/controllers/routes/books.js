const { Router } = require('express')
const {
  evaluate,
  lookup,
  findBookByParams,
  addNewBooks,
  findBookByIsbn,
  getFeaturedBooks,
  getRecentlyAddedBooks,
  findAllBooks
} = require('../bookController')

const router = Router()

router.post('/', addNewBooks)
router.get('/', findAllBooks)
router.get('/search', findBookByParams)
router.get('/featured', getFeaturedBooks)
router.get('/recentlyAdded', getRecentlyAddedBooks)

router.get('/:isbn', findBookByIsbn)
router.get('/:isbn/evaluation', evaluate)
router.get('/:isbn/lookup', lookup)

module.exports = router
