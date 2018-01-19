const { Router } = require('express')
const {
  evaluate,
  lookup,
  findBookByParams,
  addNewBooks
} = require('../controllers/bookController')

const router = Router()

// FIXME: Porque isso sāo POST e nao get?
router.post('/:isbn/evaluation', evaluate)
router.post('/:isbn/lookup', lookup)
router.post('/search', findBookByParams)
router.post('/', addNewBooks)

module.exports = router
