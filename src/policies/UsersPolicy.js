const Joi = require('joi')

function checkError(error, res) {
  switch (error.details[0].context.key) {
    case 'fullname':
      return res.status(400).send({
        error: "Le nom d'utilisateur ne peut être vide",
      })

    case 'email':
      return res.status(400).send({
        error: 'Vous avez entrez une adresse mail non valide',
      })

    case 'password':
      return res.status(400).send({
        error: 'Le mot de passe doit contenir entre 8 et 32 caratère ',
      })

    case 'phone':
      return res.status(400).send({
        error: 'Le numéro de téléphone  est incorrect',
      })

    default:
      return res.status(400).send({
        error: 'Les informations que vous avez entrées sont incorrects',
      })
  }
}
module.exports = {
  register(req, res, next) {
    console.log(req.body)
    const schema = {
      fullname: Joi.string().required(),
      phone: Joi.string().regex(new RegExp('^[+]*[0-9]{8,}$')),
      email: Joi.string().email(),
      password: Joi.string().min(8).required(),
    }
    const { error } = Joi.validate(req.body.user, schema)
    if (error) {
      checkError(error, res)
    } else {
      next()
    }
  },
  updated(req, res, next) {
    const schema = {
      fullname: Joi.string().required(),
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
