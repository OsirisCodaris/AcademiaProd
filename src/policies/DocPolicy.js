const Joi = require('joi')
const moment = require('moment')

const year = parseInt(moment().format('YYYY'), 10)

function checkError(error, res) {
  switch (error.details[0].context.key) {
    case 'name':
      res.status(400).send({
        error: 'Le titre est obligatoire et ne pas être vide',
      })
      break
    case 'pathfile':
      res.status(400).send({
        error: 'Le document ne peut être vide',
      })
      break
    case 'year':
      res.status(400).send({
        error: `L'année doit être comprise entre 1900 et ${year}`,
      })
      break
    case 'status':
      res.status(400).send({
        error: "Le status n'a pas été spécifier",
      })
      break
    case 'idtypedocs':
      res.status(400).send({
        error: "Le type du document n'a pas été spécifier",
      })
      break
    case 'idclasses':
      res.status(400).send({
        error: "La classe n'a pas été spécifier",
      })
      break
    case 'idsubjects':
      res.status(400).send({
        error: "La matière n'a pas été spécifier",
      })
      break
    default:
      res.status(400).send({
        error: 'Les informations que vous avez entrées sont incorrects',
      })
  }
}

module.exports = {
  created(req, res, next) {
    const schema = {
      name: Joi.string().required(),
      year: Joi.number().integer().min(1900).max(year),
      pathfile: Joi.string()
        .required()
        .regex(new RegExp('([a-zA-Z0-9s_.-:])+(.pdf)$')),
      answerfile: Joi.string()
        .required()
        .optional()
        .regex(new RegExp('([a-zA-Z0-9s_.-:])+(.pdf)$')),
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
        .regex(new RegExp('([a-zA-Z0-9s_.-:])+(.pdf)$')),
      answerfile: Joi.string()
        .required()
        .optional()
        .regex(new RegExp('([a-zA-Z0-9s_.-:])+(.pdf)$')),
      status: Joi.boolean().optional(),
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
}
