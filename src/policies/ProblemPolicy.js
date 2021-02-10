/* eslint-disable no-case-declarations */
const Joi = require('joi')
const ValidationError = require('../config/ValidationError')

function checkError(error, res, next) {
  const errors = new ValidationError('Problème')
  switch (error.details[0].context.key) {
    case 'idsubjects':
      errors.noSpec('Matières')
      return next(errors)

    case 'content':
      errors.noContent()
      return next(errors)

    case 'file':
      errors.nofileOrInvalid()
      return next(errors)

    default:
      errors.default()
      return next(errors)
  }
}
module.exports = {
  create(req, res, next) {
    const schema = {
      idsubjects: Joi.number().required(),
      content: Joi.string().required(),
      file: Joi.string()
        .optional()
        .regex(
          new RegExp(
            '([a-zA-Z0-9s_.-:])+(.pdf)|(.PDF)|(.jpg)|(.JPG)|(.jpeg)|(.JPEG)$'
          )
        ),
    }
    const { error } = Joi.validate(req.body, schema)
    if (error) {
      checkError(error, res, next)
    } else {
      next()
    }
  },
}
