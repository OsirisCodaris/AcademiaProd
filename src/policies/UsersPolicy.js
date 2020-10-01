const Joi = require('joi')

module.exports = {
  register(req, res, next) {
    const schema = {
      fullname: Joi.string().required(),
      phone: Joi.string().regex(new RegExp('^[+]*[0-9]{8,}$')),
      email: Joi.string().email(),
      password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,32}$')),
    }
    const { error } = Joi.validate(req.body.user, schema)
    if (error) {
      switch (error.details[0].context.key) {
        case 'fullname':
          res.status(400).send({
            error: "Le nom d'utilisateur ne peut être vide",
          })
          break
        case 'email':
          res.status(400).send({
            error: 'Vous avez entrez une adresse mail non valide',
          })
          break
        case 'password':
          res.status(400).send({
            error: 'Le mot de passe doit contenir entre 8 et 32 caratère ',
          })
          break
        case 'phone':
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
