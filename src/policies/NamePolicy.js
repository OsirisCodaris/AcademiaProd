const Joi = require('joi')

module.exports = (req, res, next) => {
  const schema = {
    name: Joi.string().required(),
  }
  const { error } = Joi.validate(req.body, schema)
  if (error) {
    switch (error.details[0].context.key) {
      case 'name':
        res.status(400).send({
          error: 'Le nom ne peut être vide',
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
}
