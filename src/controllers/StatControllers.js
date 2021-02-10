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
      const classeId = parseInt(req.params.idclasses, 10)

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
      const subjectHasClasses = await ClasseSubjectService.showClassesHavSubjectNstat(
        subjectId
      )
      return res.status(200).send(subjectHasClasses)
    } catch (errors) {
      return next(errors)
    }
  },
  async showSubjectsInClasseNstatForum(req, res, next) {
    try {
      const classeId = parseInt(req.params.idclasses, 10)

      const subjectHasClasses = await ClasseSubjectService.showSubjectsInClasseNstatForum(
        classeId
      )
      return res.status(200).send(subjectHasClasses)
    } catch (errors) {
      return next(errors)
    }
  },
  async showClassesHavSubjectNstatForum(req, res, next) {
    try {
      const subjectId = parseInt(req.params.idsubjects, 10)
      const subjectHasClasses = await ClasseSubjectService.showClassesHavSubjectNstatForum(
        subjectId
      )
      return res.status(200).send(subjectHasClasses)
    } catch (errors) {
      return next(errors)
    }
  },
}
