const { Router } = require('express')
const validate = require('express-validation')
const newOrder = require('./validation/createOrder')
const { createOrder } = require('../controllers/orderController')

const router = Router({ mergeParams: true })

router.post('/', validate(newOrder), createOrder)

module.exports = router
