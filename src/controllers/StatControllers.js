const AdminService = require('../services/AdminService')
const StatService = require('../services/StatService')
const ClasseSubjectService = require('../services/ClasseSubjectService')

module.exports = {
  async dashboard(req, res, next) {
    try {
      const stats = await StatService.dashboard()
      return res.status(201).send(stats)
    } catch (errors) {
      return next(errors)
    }
  },
  async showSubjectsInClasseNstat(req, res, next) {
    try {
      const classeId = parseInt(req.params.idsubjects, 10)

      const subjectHasClasses = await ClasseSubjectService.showSubjectsInClasseNstat(
        classeId
      )
      return res.status(200).send(subjectHasClasses)
    } catch (errors) {
      return next(errors)
    }
  },
  async showClassesHavSubjectNstat(req, res, next) {
    try {
      const subjectId = parseInt(req.params.idsubjects, 10)
      const subjectHasClasses = await AdminService.showClassesHavSubjectNstat(
        subjectId
      )
      return res.status(200).send(subjectHasClasses)
    } catch (errors) {
      return next(errors)
    }
  },
  async delete(req, res, next) {
    try {
      const adminId = parseInt(req.params.id, 10)
      await AdminService.delete(adminId)
      return res.sendStatus(204)
    } catch (errors) {
      return next(errors)
    }
  },
}
