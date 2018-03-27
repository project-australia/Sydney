const { Router } = require('express')
const validate = require('express-validation')
const { create, update } = require('./validation/orderRoutes')
const { createOrder, updateOrder, getAll } = require('../orderController')

const router = Router({ mergeParams: true })

router.post('/', validate(create), createOrder)
router.get('/', getAll)
router.put('/:orderId/', validate(update), updateOrder)

module.exports = router
