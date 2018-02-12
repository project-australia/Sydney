const { Router } = require('express')
const {
  getSellingToggle,
  setSellingToggle
} = require('../configurationsController')

const router = Router()

router.get('/sellings', getSellingToggle)
router.put('/sellings', setSellingToggle)

module.exports = router
