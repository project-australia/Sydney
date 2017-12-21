const { Router } = require('express')
const { getBookEvaluation } = require('../../controllers/pricingController')

const router = Router()

router.get('/', getBookEvaluation)

module.exports = router
