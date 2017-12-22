const { Router } = require('express')

const health = require('./health')
const { notFound } = require('./notFound')
const { errorHandler } = require('./errorHandler')
const { getBookEvaluation } = require('../controllers/pricingController')

const router = Router()

router.use('/health', health)
router.get('/pricing', getBookEvaluation)

router.use(notFound)
router.use(errorHandler)

module.exports = { router }
