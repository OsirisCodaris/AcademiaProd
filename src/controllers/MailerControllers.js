const { Mailer } = require('../utils/Mailer')

module.exports = {
  async send(req, res, next) {
    try {
      const { from, subject, message } = req.body
      const to = 'administrator@academiagabon.ga'
      Mailer(from, to, subject, message)
      return res
        .status(200)
        .send({ message: 'Votre message a été envoyé. Merci!' })
    } catch (errors) {
      return next(errors)
    }
  },
}
