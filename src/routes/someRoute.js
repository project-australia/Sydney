var express = require('express')
var router = express.Router()
var someController = require('../controllers/someController')

router.get('/', someController.findAll)
router.post('/', someController.create)

module.exports = router
