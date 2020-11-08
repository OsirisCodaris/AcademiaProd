const { Subjects } = require('../models')
const RequestError = require('../config/RequestError')
const ServerError = require('../config/ServerError')

module.exports = {
  async create(req, res, next) {
    try {
      const { name } = req.body
      const subjectVerif = await Subjects.findOne({
        where: {
          name,
        },
      })
      if (subjectVerif) {
        const error = new RequestError('Matière')
        error.Exist()
        throw error
      }
      const subject = await Subjects.create({
        name,
      })
      return res.status(201).send({
        idsubjects: subject.idsubjects,
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
      const subject = await Subjects.findAndCountAll()
      return res.send(subject)
    } catch (errors) {
      return next(new ServerError(errors))
    }
  },
  async delete(req, res, next) {
    try {
      const id = parseInt(req.params.id, 10)
      const subjectVerif = await Subjects.findOne({
        where: {
          idsubjects: id,
        },
      })
      if (!subjectVerif) {
        const error = new RequestError('Matière')
        error.notExistOrDelete()
        throw error
      }
      await subjectVerif.destroy()
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
      const subject = await Subjects.findByPk(id)
      if (!subject) {
        const error = new RequestError('Matière')
        error.notExistOrDelete()
        throw error
      }
      const { name } = req.body
      const nameVerif = await Subjects.findOne({ where: { name } })
      if (nameVerif && nameVerif.name !== subject.name) {
        const error = new RequestError('Nom')
        error.Exist()
        throw error
      }
      await subject.update({ name })
      return res.status(200).send({ idsubjects: subject.idsubjects })
    } catch (errors) {
      if (errors instanceof RequestError) {
        return next(errors)
      }
      return next(new ServerError(errors))
    }
  },
}
