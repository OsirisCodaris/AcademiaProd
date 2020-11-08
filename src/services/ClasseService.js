const { Classes } = require('../models')
const RequestError = require('../config/RequestError')
const ServerError = require('../config/ServerError')

module.exports = {
  async create(req, res, next) {
    try {
      const { name } = req.body
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
      return res.status(201).send({
        idclasses: classe.idclasses,
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
      const classe = await Classes.findAndCountAll()
      return res.send(classe)
    } catch (errors) {
      return next(new ServerError(errors))
    }
  },
  async delete(req, res, next) {
    try {
      console.log(req.params)
      const id = parseInt(req.params.id, 10)
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
      return res.sendStatus(204)
    } catch (errors) {
      if (errors instanceof RequestError) {
        return next(errors)
      }
      return next(new ServerError(errors))
    }
  },
  async update(req, res, next) {
    try {
      const id = parseInt(req.params.id, 10)
      console.log(id)
      const classe = await Classes.findByPk(id)
      if (!classe) {
        const error = new RequestError('Classe')
        error.notExistOrDelete()
        throw error
      }
      const { name } = req.body
      const nameVerif = await Classes.findOne({ where: { name } })
      if (nameVerif && nameVerif.name !== classe.name) {
        const error = new RequestError('Nom')
        error.Exist()
        throw error
      }
      await classe.update({ name })
      return res.status(200).send({ idclasses: classe.idclasses })
    } catch (errors) {
      if (errors instanceof RequestError) {
        return next(errors)
      }
      return next(new ServerError(errors))
    }
  },
}
