const { Subjects } = require('../models')
const RequestError = require('../config/RequestError')
const ServerError = require('../config/ServerError')

module.exports = {
  async create(name) {
    try {
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
      return subject
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
  async showAll() {
    try {
      const subject = await Subjects.findAndCountAll()
      return subject
    } catch (errors) {
      throw new ServerError(errors)
    }
  },
  async delete(id) {
    try {
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
      const subject = await Subjects.findByPk(id)
      if (!subject) {
        const error = new RequestError('Matière')
        error.notExistOrDelete()
        throw error
      }
      const nameVerif = await Subjects.findOne({ where: { name } })
      if (nameVerif && nameVerif.name !== subject.name) {
        const error = new RequestError('Nom')
        error.Exist()
        throw error
      }
      await subject.update({ name })
      return subject
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
}
