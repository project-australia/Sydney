const { Router } = require('express')
const {
  evaluate,
  lookup,
  findBookByParams,
  addNewBooks,
  getFeaturedBooks,
  getRecentlyAddedBooks
} = require('../controllers/bookController')

const router = Router()

router.post('/:isbn/evaluation', evaluate)
router.post('/:isbn/lookup', lookup)
router.post('/search', findBookByParams)
router.post('/', addNewBooks)
router.get('/featuredBooks', getFeaturedBooks)
router.get('/recentlyAddedBooks', getRecentlyAddedBooks)

module.exports = router
