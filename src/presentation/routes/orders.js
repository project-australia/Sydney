const { Router } = require('express')
const validate = require('express-validation')
const { create, update, confirmation } = require('./validation/orderRoutes')
const {
  createOrder,
  updateOrder,
  getAll,
  confirmOrder,
  findBySearchParam
} = require('../controllers/orderController')

const router = Router({ mergeParams: true })

router.post('/', validate(create), createOrder)
router.get('/', getAll)
router.get('/search', findBySearchParam)
router.put('/:orderId/', validate(update), updateOrder)
router.post('/:orderId/confirmation', validate(confirmation), confirmOrder)

module.exports = router
