const { typeDocs } = require('../models')
const RequestError = require('../config/RequestError')
const ServerError = require('../config/ServerError')

module.exports = {
  async create(req, res, next) {
    try {
      const { name } = req.body
      const typeDocVerif = await typeDocs.findOne({
        where: {
          name,
        },
      })
      if (typeDocVerif) {
        const error = new RequestError('Catégories')
        error.Exist()
        throw error
      }
      const type = await typeDocs.create({
        name,
      })
      return res.status(201).send({
        idtypedocs: type.idtypedocs,
      })
    } catch (errors) {
      if (errors instanceof RequestError) {
        return next(errors)
      }
      return next(new ServerError(errors))
    }
  },
  async showAll(req, res, next) {
    try {
      const typedocs = await typeDocs.findAndCountAll()
      return res.status(201).send(typedocs)
    } catch (errors) {
      return next(new ServerError(errors))
    }
  },
  async update(req, res, next) {
    try {
      const id = parseInt(req.params.id, 10)
      const typeDoc = await typeDocs.findByPk(id)
      if (!typeDoc) {
        const error = new RequestError('Catégories')
        error.notExistOrDelete()
        throw error
      }
      const { name } = req.body
      const nameVerif = await typeDocs.findOne({ where: { name } })
      if (nameVerif && nameVerif.name !== typeDoc.name) {
        const error = new RequestError('Nom')
        error.Exist()
        throw error
      }
      await typeDoc.update({ name })
      return res.status(200).send({ idtypedocs: typeDoc.idtypedocs })
    } catch (errors) {
      if (errors instanceof RequestError) {
        return next(errors)
      }
      return next(new ServerError(errors))
    }
  },
  async delete(req, res, next) {
    try {
      const id = parseInt(req.params.id, 10)
      const typeDocVerif = await typeDocs.findByPk(id)
      if (!typeDocVerif) {
        const error = new RequestError('Catégories')
        error.notExistOrDelete()
        throw error
      }
      await typeDocVerif.destroy()
      return res.sendStatus(204)
    } catch (errors) {
      if (errors instanceof RequestError) {
        return next(errors)
      }
      return next(new ServerError(errors))
    }
  },
}
