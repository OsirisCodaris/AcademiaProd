const { Teachers, Subjects } = require('../models')
const UserService = require('./UserService')
const RequestError = require('../config/RequestError')
const ServerError = require('../config/ServerError')

module.exports = {
  async create(TeacherCreate) {
    try {
      const user = await UserService.create(TeacherCreate.user)
      const subject = await Subjects.findByPk(TeacherCreate.teacher.idsubjects)
      if (!subject) {
        const error = new RequestError('Matière')
        error.notExistOrDelete()
        throw error
      }

      const teacher = await Teachers.create({
        city: TeacherCreate.teacher.city,
        classes: TeacherCreate.teacher.classes,
        phone2: TeacherCreate.teacher.phone2,
        tutor: TeacherCreate.teacher.tutor,
        idsubjects: subject.idsubjects,
        idteachers: user.idusers,
      })
      return teacher
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
  async update(id, TeacherUpdate) {
    try {
      await UserService.update(id, TeacherUpdate.user)
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
