const { Router } = require('express')
const validate = require('express-validation')
const signUpValidation = require('./validation/signUpFormValidation')
const profileValidation = require('./validation/profileValidation')
const {
  createProfile,
  updateProfile,
  getProfile,
  requestWithdraw,
  signUp
} = require('../userController')

const router = Router()

router.post('/', validate(signUpValidation), signUp)
router.post('/:id/profile', validate(profileValidation), createProfile)
router.put('/:id/profile', updateProfile)
router.put('/:id/requestwithdraw', requestWithdraw)
router.get('/:id/profile', getProfile)

module.exports = router
