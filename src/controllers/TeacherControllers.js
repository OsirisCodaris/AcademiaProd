const TeacherService = require('../services/TeacherService')

module.exports = {
  async create(req, res, next) {
    try {
      const teacher = await TeacherService.create(req.body)
      return res.status(201).send({
        user: teacher.idteachers,
      })
    } catch (errors) {
      return next(errors)
    }
  },
  async update(req, res, next) {
    try {
      const teacherId = parseInt(req.params.id, 10)
      const teacher = await TeacherService.update(teacherId, req.body)
      return res.status(201).send({
        user: teacher.idteachers,
      })
    } catch (errors) {
      return next(errors)
    }
  },
}
