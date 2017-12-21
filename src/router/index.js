const { Router } = require('express')

const health = require('./health')
const some = require('./some')
const pricing = require('./pricing')
const { notFound } = require('./notFound')
const { errorHandler } = require('./errorHandler')

const router = Router()

router.use('/some', some)
router.use('/health', health)
router.use('/pricing', pricing)

router.use(notFound)
router.use(errorHandler)

module.exports = { router }
