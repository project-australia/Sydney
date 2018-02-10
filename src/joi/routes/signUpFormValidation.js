const Joi = require('joi')
const address = require('../domain/address')

module.exports = {
  body: {
    referredBy: Joi.string(),
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .required(),
    birthDate: Joi.date()
      .max('now')
      .required(),
    telephone: Joi.string().required(),
    school: Joi.string().required(),
    address
  }
}
