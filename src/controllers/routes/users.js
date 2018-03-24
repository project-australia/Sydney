const { Router } = require('express')
const validate = require('express-validation')
const signUpValidation = require('./validation/signUpFormValidation')
const profileValidation = require('./validation/profileValidation')
const {
  createProfile,
  updateProfile,
  getProfile,
  requestWithdraw,
  signUp,
  getAll,
  deleteProfile
} = require('../userController')

const router = Router()

router.get('/', getAll)
router.post('/', validate(signUpValidation), signUp)
router.post('/:id/profile', validate(profileValidation), createProfile)
router.put('/:id/profile', updateProfile)
router.put('/:id/requestwithdraw', requestWithdraw)
router.get('/:id/profile', getProfile)
router.delete('/:id/profile', deleteProfile)

module.exports = router
