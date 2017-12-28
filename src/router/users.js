const { Router } = require('express')
const { createProfile, getProfile, signUp } = require('../controllers/userController')

const router = Router()

router.post('/', signUp)
router.post('/:id/profile', createProfile)
router.get('/:id/profile', getProfile)

module.exports = router
