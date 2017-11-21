const { Router } = require('express')
const { findAll, create } = require('../../controllers/someController')

const router = Router()

router.get('/', findAll)
router.post('/', create)

module.exports = router
