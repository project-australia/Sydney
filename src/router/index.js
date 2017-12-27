const { Router } = require('express')

const health = require('./health')
const books = require('./books')
const configurations = require('./configurations')
const { notFound } = require('./notFound')
const { errorHandler } = require('./errorHandler')
const { evaluate } = require('../controllers/bookController')

const router = Router()

router.use('/books', books)
router.use('/health', health)
router.get('/pricing', evaluate)
router.use('/configurations', configurations)

router.use(notFound)
router.use(errorHandler)

module.exports = { router }
