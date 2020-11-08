/* eslint-disable no-case-declarations */
const Joi = require('joi')
const ValidationError = require('../config/ValidationError')

function checkError(error, res, next) {
  const errors = new ValidationError('Utilisateur')
  switch (error.details[0].context.key) {
    case 'fullname':
      errors.noNameOrInvalid()
      return next(errors)

    case 'email':
      errors.noEmailOrInvalid()
      return next(errors)

    case 'password':
      errors.noPasswordOrInvalid()
      return next(errors)

    case 'phone':
      errors.noPhoneOrInvalid()
      return next(errors)

    default:
      errors.default()
      return next(errors)
  }
}
module.exports = {
  register(req, res, next) {
    const schema = {
      fullname: Joi.string().min(3).required(),
      phone: Joi.string().regex(new RegExp('^[+]*[0-9]{8,}$')),
      email: Joi.string().email(),
      password: Joi.string().min(8).required(),
    }
    const { error } = Joi.validate(req.body.user, schema)
    if (error) {
      checkError(error, res, next)
    } else {
      next()
    }
  },
  updated(req, res, next) {
    const schema = {
      fullname: Joi.string().min(3).required(),
      phone: Joi.string().regex(new RegExp('^[+]*[0-9]{8,}$')),
      email: Joi.string().email(),
      password: Joi.string().min(8).optional(),
    }
    const { error } = Joi.validate(req.body.user, schema)
    if (error) {
      checkError(error, res)
    } else {
      next()
    }
  },
}
