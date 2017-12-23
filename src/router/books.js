const { Router } = require('express')
const {
  buy,
  find,
  rent,
  sell,
  donate,
  details,
  evaluate
} = require('../controllers/bookController')

const router = Router()

router.get('/', find)
router.get('/:isbn', details)
router.post('/:isbn/rent', rent)
router.post('/:isbn/sell', sell)
router.post('/:isbn/buy', buy)
router.post('/:isbn/donate', donate)
router.post('/:isbn/evaluation', evaluate)

module.exports = router
