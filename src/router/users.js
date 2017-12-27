const { Router } = require('express')
const { createProfile } = require('../controllers/userController')

const router = Router()

router.post('/:id/profile', createProfile)

module.exports = router
