const { Router } = require('express')
const {
  evaluate,
  lookup
} = require('../controllers/bookController')

const router = Router()

router.post('/:isbn/evaluation', evaluate)
router.post('/:isbn/lookup', lookup)

module.exports = router
