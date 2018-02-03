const { Router } = require('express')
const validate = require('express-validation')
const signUpValidation = require('../joi/routes/signUpFormValidation')
const profileValidation = require('../joi/routes/profileValidation')
const { createProfile, getProfile, signUp } = require('../controllers/userController')

const router = Router()

router.post('/', validate(signUpValidation), signUp)
router.post('/:id/profile', validate(profileValidation), createProfile)
router.get('/:id/profile', getProfile)

module.exports = router
