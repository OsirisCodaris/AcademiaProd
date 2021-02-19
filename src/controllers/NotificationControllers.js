const NotificationService = require('../services/NotificationService')

// const config = require('../config/config')

module.exports = {
  async createOrUpdate(req, res, next) {
    try {
      const { idusers } = req.user
      const { idproblems } = req.params
      const { tokenfcm } = req.body
      console.log(req.body)
      const notif = await NotificationService.associate(
        idusers,
        idproblems,
        tokenfcm
      )
      return res.status(201).send(notif)
    } catch (errors) {
      return next(errors)
    }
  },
  async updateTokenFcm(req, res, next) {
    try {
      const { idusers } = req.user
      const { tokenfcm } = req.body
      const notif = await NotificationService.updateToken(idusers, tokenfcm)
      return res.send(notif)
    } catch (errors) {
      return next(errors)
    }
  },
  async showTokenFcm(req, res, next) {
    try {
      const { idusers, idproblems } = req.params
      const notif = await NotificationService.showNotif(idusers, idproblems)
      return res.send(notif)
    } catch (errors) {
      return next(errors)
    }
  },
}
