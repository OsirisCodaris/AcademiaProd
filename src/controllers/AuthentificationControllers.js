const AuthentificationService = require('../services/AuthentificationService')

module.exports = {
  async login(req, res, next) {
    try {
      const user = await AuthentificationService.login(req.body)
      return res.status(200).send(user)
    } catch (errors) {
      return next(errors)
    }
  },
  async token(req, res, next) {
    try {
      const token = await AuthentificationService.token(req.body)
      return res.send(token)
    } catch (errors) {
      return next(errors)
    }
  },
  async resetPassword(req, res, next) {
    try {
      const { email } = req.body
      await AuthentificationService.resetPassword(email)
      return res.status(200).json({
        message: `Nous vous avons envoyé un mail pour poursuivre la réinitialisation.`,
      })
    } catch (errors) {
      return next(errors)
    }
  },
  async newPassword(req, res, next) {
    try {
      await AuthentificationService.newPassword(req.body)
      return res.status(201).send({
        message: 'le mot de passe a été modifié',
      })
    } catch (errors) {
      return next(errors)
    }
  },
}
