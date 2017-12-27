const { Router } = require('express')
const { getSellingToggle } = require('../controllers/configurationsController')

const router = Router()

router.get('/sellings', getSellingToggle)

module.exports = router
