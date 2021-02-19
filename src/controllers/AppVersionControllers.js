const AppVersionService = require('../services/AppVersionService')

module.exports = {
  async create(req, res, next) {
    try {
      const classe = await AppVersionService.create(req.body.name)
      return res.status(201).send({
        idclasses: classe.idclasses,
      })
    } catch (errors) {
      return next(errors)
    }
  },
  async showAll(req, res, next) {
    try {
      const classe = await AppVersionService.showAll()
      return res.send(classe)
    } catch (errors) {
      return next(errors)
    }
  },
  async update(req, res, next) {
    try {
      const classeId = parseInt(req.params.id, 10)
      const { name } = req.body
      const classe = await AppVersionService.update(classeId, name)
      return res.status(201).send({
        idclasses: classe.idclasses,
      })
    } catch (errors) {
      return next(errors)
    }
  },
  async delete(req, res, next) {
    try {
      const classeId = parseInt(req.params.id, 10)
      await AppVersionService.delete(classeId)
      return res.sendStatus(204)
    } catch (errors) {
      return next(errors)
    }
  },
  async showLast(req, res, next) {
    try {
      const appversion = await AppVersionService.showLast()
      return res.status(200).send({
        appversion,
      })
    } catch (errors) {
      return next(errors)
    }
  },
}
