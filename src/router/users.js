const { Router } = require('express')
const { createProfile, getProfile } = require('../controllers/userController')

const router = Router()

router.post('/:id/profile', createProfile)
router.get('/:id/profile', getProfile)

module.exports = router
