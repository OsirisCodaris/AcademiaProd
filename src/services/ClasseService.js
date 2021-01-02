const { Classes } = require('../models')
const RequestError = require('../config/RequestError')
const ServerError = require('../config/ServerError')

module.exports = {
  async create(name) {
    try {
      const classeVerif = await Classes.findOne({
        where: {
          name,
        },
      })
      if (classeVerif) {
        const error = new RequestError('Classe')
        error.Exist()
        throw error
      }
      const classe = await Classes.create({
        name,
      })
      return classe
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
  async showAll() {
    try {
      const classe = await Classes.findAndCountAll()
      return classe
    } catch (errors) {
      return new ServerError(errors)
    }
  },
  async delete(id) {
    try {
      const classeVerif = await Classes.findOne({
        where: {
          idclasses: id,
        },
      })
      if (!classeVerif) {
        const error = new RequestError('Classe')
        error.notExistOrDelete()
        throw error
      }
      await classeVerif.destroy()
      return true
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
  async update(id, name) {
    try {
      const classe = await Classes.findByPk(id)
      if (!classe) {
        const error = new RequestError('Classe')
        error.notExistOrDelete()
        throw error
      }

      const nameVerif = await Classes.findOne({ where: { name } })
      if (nameVerif && nameVerif.name !== classe.name) {
        const error = new RequestError('Classe - nom')
        error.Exist()
        throw error
      }
      await classe.update({ name })
      return classe
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
}
