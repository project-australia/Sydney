const Joi = require('joi')

module.exports = Joi.object()
  .keys({
    street: Joi.string().required(),
    zipCode: Joi.string().required(),
    state: Joi.string().required()
  })
  .required()
