const { Router } = require('express')

const books = require('./books')
const users = require('./users')
const health = require('./health')
const { notFound } = require('./notFound')
const configurations = require('./configurations')
const { errorHandler } = require('./errorHandler')

const router = Router()

router.use('/books', books)
router.use('/users', users)
router.use('/health', health)
router.use('/configurations', configurations)

router.use(notFound)
router.use(errorHandler)

module.exports = { router }
