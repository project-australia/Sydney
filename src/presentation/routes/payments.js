const { Router } = require('express')
const { token } = require('../controllers/paymentsController')

const router = Router()

router.get('/token', token)

module.exports = router
