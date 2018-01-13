const { Router } = require('express')
const {
  evaluate,
  lookup
} = require('../controllers/bookController')

const router = Router()

// FIXME: Porque isso sāo POST e nao get?
router.post('/:isbn/evaluation', evaluate)
router.post('/:isbn/lookup', lookup)

module.exports = router
