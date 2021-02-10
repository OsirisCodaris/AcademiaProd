const Joi = require('joi')
const moment = require('moment')
const ValidationError = require('../config/ValidationError')

const year = parseInt(moment().format('YYYY'), 10)

function checkError(error, next) {
  const errors = new ValidationError('Document')
  switch (error.details[0].context.key) {
    case 'name':
      errors.noNameOrInvalid()
      return next(errors)
    case 'pathfile':
      errors.nofileOrInvalid()
      return next(errors)
    case 'year':
      errors.invalidYear()
      return next(errors)
    case 'status':
      errors.noSpec('status')
      return next(errors)
    case 'idtypedocs':
      errors.noSpec('type document')
      return next(errors)
    case 'idclasses':
      errors.noSpec('classes')
      return next(errors)
    case 'idsubjects':
      errors.noSpec('matières')
      return next(errors)
    default:
      errors.default()
      return next(errors)
  }
}

module.exports = {
  created(req, res, next) {
    const schema = {
      name: Joi.string().required(),
      year: Joi.number().integer().min(1900).max(year),
      pathfile: Joi.string()
        .required()
        .regex(new RegExp('([a-zA-Z0-9s_.-:])+(.pdf)|(.PDF)$')),
      answerfile: Joi.string()
        .required()
        .optional()
        .regex(new RegExp('([a-zA-Z0-9s_.-:])+(.pdf)|(.PDF)$')),
      status: Joi.boolean(),
      answerstatus: Joi.boolean().optional(),
      idtypedocs: Joi.number().required(),
      idclasses: Joi.required(),
      idsubjects: Joi.number().required(),
      notions: Joi.string().optional(),
    }
    const { error } = Joi.validate(req.body, schema)
    if (error) {
      checkError(error, res)
    } else {
      next()
    }
  },
  updated(req, res, next) {
    const schema = {
      name: Joi.string().required(),
      year: Joi.number().integer().min(1900).max(year).required(),
      pathfile: Joi.string()
        .required()
        .optional()
        .regex(new RegExp('([a-zA-Z0-9s_.-:])+(.pdf)|(.PDF)$')),
      answerfile: Joi.string()
        .required()
        .optional()
        .regex(new RegExp('([a-zA-Z0-9s_.-:])+(.pdf)|(.PDF)$')),
      status: Joi.boolean().optional(),
      answerstatus: Joi.boolean().optional(),
      idtypedocs: Joi.number().required(),
      idclasses: Joi.required(),
      idsubjects: Joi.number().required(),
      notions: Joi.string().optional(),
    }
    const { error } = Joi.validate(req.body, schema)
    if (error) {
      checkError(error, res, next)
    } else {
      next()
    }
  },
}
