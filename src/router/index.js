const { Router } = require('express')

const health = require('./health')
const pricing = require('./pricing')
const { notFound } = require('./notFound')
const { errorHandler } = require('./errorHandler')

const router = Router()

router.use('/health', health)
router.use('/pricing', pricing)

router.use(notFound)
router.use(errorHandler)

module.exports = { router }
