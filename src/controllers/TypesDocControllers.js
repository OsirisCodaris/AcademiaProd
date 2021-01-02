const TypesDocService = require('../services/TypesDocService')

module.exports = {
  async create(req, res, next) {
    try {
      const typedoc = await TypesDocService.create(req.body.name)
      return res.status(201).send({
        idtypedocs: typedoc.idtypedocs,
      })
    } catch (errors) {
      return next(errors)
    }
  },
  async showAll(req, res, next) {
    try {
      const typedoc = await TypesDocService.showAll()
      return res.send(typedoc)
    } catch (errors) {
      return next(errors)
    }
  },
  async update(req, res, next) {
    try {
      const typedocId = parseInt(req.params.id, 10)
      const { name } = req.body
      const typedoc = await TypesDocService.update(typedocId, name)
      return res.status(201).send({
        idtypedocs: typedoc.idtypedocs,
      })
    } catch (errors) {
      return next(errors)
    }
  },
  async delete(req, res, next) {
    try {
      const typedocId = parseInt(req.params.id, 10)
      await TypesDocService.delete(typedocId)
      return res.sendStatus(204)
    } catch (errors) {
      return next(errors)
    }
  },
}
