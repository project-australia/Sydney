const { Router } = require('express')

const books = require('./books')
const users = require('./users')
const orders = require('./orders')
const health = require('./health')
const { notFound } = require('./notFound')
const configurations = require('./configurations')
const { errorHandler } = require('./errorHandler')

const router = Router()

router.use('/books', books)
router.use('/configurations', configurations)
router.use('/health', health)
router.use('/users', users)
router.use('/users/:id/orders', orders)

router.use(notFound)
router.use(errorHandler)

module.exports = { router }
