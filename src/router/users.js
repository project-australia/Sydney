const { Router } = require('express')
const validate = require('express-validation')
const signUpValidation = require('../joi/routes/signUpFormValidation')
const profileValidation = require('../joi/routes/profileValidation')
const {
  createProfile,
  updateProfile,
  getProfile,
  signUp
} = require('../controllers/userController')

const router = Router()

router.post('/', validate(signUpValidation), signUp)
router.post('/:id/profile', validate(profileValidation), createProfile)
router.put('/:id/profile', updateProfile)
router.get('/:id/profile', getProfile)

module.exports = router
