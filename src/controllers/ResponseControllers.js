const ResponseService = require('../services/ResponseService')
const { PushNotification } = require('../utils/NotificationSender')

module.exports = {
  async create(req, res, next) {
    try {
      const { idproblems } = req.params
      const { content, file } = req.body

      const response = await ResponseService.create(
        req.user,
        idproblems,
        content,
        file
      )
      PushNotification(response)
      return res.status(201).send({
        idresponses: response.idresponses,
      })
    } catch (errors) {
      return next(errors)
    }
  },
  async isSolved(req, res, next) {
    try {
      const { status } = req.body
      const { idresponses } = req.params
      const { idusers } = req.user
      const response = await ResponseService.updateStatus(
        idusers,
        idresponses,
        status
      )
      return res.status(201).send({
        idresponses: response.idresponses,
      })
    } catch (errors) {
      return next(errors)
    }
  },
  async delete(req, res, next) {
    try {
      const { idresponses } = req.params
      const idstudents = req.user.idusers

      await ResponseService.delete(idstudents, idresponses)
      return res.sendStatus(204)
    } catch (errors) {
      return next(errors)
    }
  },
  async showResponseInProblem(req, res, next) {
    try {
      const { idproblems } = req.params

      const responses = await ResponseService.showResponseInProblem(idproblems)
      return res.send(responses)
    } catch (errors) {
      return next(errors)
    }
  },
}
