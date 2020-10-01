const Joi = require('joi')

module.exports = {
  register(req, res, next) {
    const schema = {
      city: Joi.string().required(),
      idsubjects: Joi.number().required(),
      phone2: Joi.string().regex(new RegExp('^[+]*[0-9]{8,}$')).allow(null),
      tutor: Joi.boolean().allow(null),
      classes: Joi.string().allow(null),
    }
    const { error } = Joi.validate(req.body.teacher, schema)
    if (error) {
      switch (error.details[0].context.key) {
        case 'idsubjects':
          res.status(400).send({
            error: 'La matières est obligatoire',
          })
          break
        case 'city':
          res.status(400).send({
            error: 'Le renseignement de la ville est obligatoire',
          })
          break
        case 'classes':
          res.status(400).send({
            error: 'Le classes doit contenir des les lettres',
          })
          break
        case 'tutor':
          res.status(400).send({
            error: 'Le tuteur est un boolean ',
          })
          break
        case 'phone2':
          res.status(400).send({
            error: 'Le numéro de téléphone  est incorrect',
          })
          break
        default:
          res.status(400).send({
            error: 'Les informations que vous avez entrées sont incorrects',
          })
      }
    } else {
      next()
    }
  },
}
