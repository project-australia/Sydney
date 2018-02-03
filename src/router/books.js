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
// TODO: Remove these URLs from post route
router.post('/:isbn/evaluation', evaluate)
router.post('/:isbn/lookup', lookup)
router.post('/search', findBookByParams)

router.get('/:isbn/evaluation', evaluate)
router.get('/:isbn/lookup', lookup)
router.get('/search', findBookByParams)

router.post('/', addNewBooks)
router.get('/featured', getFeaturedBooks)
router.get('/recentlyAdded', getRecentlyAddedBooks)

module.exports = router
