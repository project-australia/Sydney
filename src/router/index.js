const { Router } = require('express')

const health = require('./health')
const books = require('./books')
const configurations = require('./configurations')
const users = require('./users')
const { notFound } = require('./notFound')
const { errorHandler } = require('./errorHandler')

const router = Router()

router.use('/books', books)
router.use('/users', users)
router.use('/health', health)
router.use('/configurations', configurations)

router.use(notFound)
router.use(errorHandler)

module.exports = { router }
