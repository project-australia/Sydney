const { Router } = require('express')
const validate = require('express-validation')
const newOrder = require('../joi/routes/createOrder')
const { createOrder } = require('../controllers/orderController')

const router = Router({mergeParams: true})

router.post('/', validate(newOrder), createOrder)

module.exports = router
