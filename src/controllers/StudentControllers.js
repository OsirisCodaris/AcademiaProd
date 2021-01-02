const StudentService = require('../services/StudentService')

module.exports = {
  async create(req, res, next) {
    try {
      const student = await StudentService.create(req.body)
      return res.status(201).send({
        user: student.idstudents,
      })
    } catch (errors) {
      return next(errors)
    }
  },
  async update(req, res, next) {
    try {
      const studentId = parseInt(req.params.id, 10)
      const student = await StudentService.update(studentId, req.body)
      return res.status(201).send({
        user: student.idstudents,
      })
    } catch (errors) {
      return next(errors)
    }
  },
}
