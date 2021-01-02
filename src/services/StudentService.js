const { Students, Classes } = require('../models')
const UserService = require('./UserService')
const RequestError = require('../config/RequestError')
const ServerError = require('../config/ServerError')

module.exports = {
  async create(StudentCreate) {
    try {
      const user = await UserService.create(StudentCreate.user)
      const classe = await Classes.findByPk(StudentCreate.student.idclasses)
      if (!classe) {
        const error = new RequestError('Classe')
        error.notExistOrDelete()
        throw error
      }
      const student = await Students.create({
        idclasses: classe.idclasses,
        idstudents: user.idusers,
      })
      return student
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
  async update(id, StudentUpdate) {
    try {
      await UserService.update(id, StudentUpdate.user)
      /* do something later */
      return true
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
}
