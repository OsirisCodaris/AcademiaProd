const { typeDocs } = require('../models')
const RequestError = require('../config/RequestError')
const ServerError = require('../config/ServerError')

module.exports = {
  async create(name) {
    try {
      const typeDocVerif = await typeDocs.findOne({
        where: {
          name,
        },
      })
      if (typeDocVerif) {
        const error = new RequestError('Catégories - nom')
        error.Exist()
        throw error
      }
      const type = await typeDocs.create({
        name,
      })
      return type
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
  async showAll() {
    try {
      const typedocs = await typeDocs.findAndCountAll()
      return typedocs
    } catch (errors) {
      return new ServerError(errors)
    }
  },
  async update(id, name) {
    try {
      const typeDoc = await typeDocs.findByPk(id)
      if (!typeDoc) {
        const error = new RequestError('Catégories')
        error.notExistOrDelete()
        throw error
      }
      const nameVerif = await typeDocs.findOne({ where: { name } })
      if (nameVerif && nameVerif.name !== typeDoc.name) {
        const error = new RequestError('Ctégories - nom')
        error.Exist()
        throw error
      }
      await typeDoc.update({ name })
      return typeDoc
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
  async delete(id) {
    try {
      const typeDocVerif = await typeDocs.findByPk(id)
      if (!typeDocVerif) {
        const error = new RequestError('Catégories')
        error.notExistOrDelete()
        throw error
      }
      await typeDocVerif.destroy()
      return true
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
}
