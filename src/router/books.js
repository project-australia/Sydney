const { Router } = require('express')
const {
  evaluate
} = require('../controllers/bookController')

const router = Router()

router.post('/:isbn/evaluation', evaluate)

module.exports = router
