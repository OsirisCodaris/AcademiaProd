const SubjectService = require('../services/SubjectService')
const ClasseSubjectService = require('../services/ClasseSubjectService')

module.exports = {
  async create(req, res, next) {
    try {
      const subject = await SubjectService.create(req.body.name)
      return res.status(201).send({
        idsubjects: subject.idsubjects,
      })
    } catch (errors) {
      return next(errors)
    }
  },
  async showAll(req, res, next) {
    try {
      const subject = await SubjectService.showAll()
      return res.send(subject)
    } catch (errors) {
      return next(errors)
    }
  },
  async update(req, res, next) {
    try {
      const subjectId = parseInt(req.params.id, 10)
      const { name } = req.body
      const subject = await SubjectService.update(subjectId, name)
      return res.status(201).send({
        idsubjects: subject.idsubjects,
      })
    } catch (errors) {
      return next(errors)
    }
  },
  async delete(req, res, next) {
    try {
      const subjectId = parseInt(req.params.id, 10)
      await SubjectService.delete(subjectId)
      return res.sendStatus(204)
    } catch (errors) {
      return next(errors)
    }
  },
  async associate(req, res, next) {
    try {
      const classeId = parseInt(req.params.idclasses, 10)
      const subjectsId = req.body.idsubjects
      const error = await ClasseSubjectService.associate(classeId, subjectsId)
      return res.status(201).send({
        error,
      })
    } catch (errors) {
      return next(errors)
    }
  },
  async showSubjectsInClasse(req, res, next) {
    try {
      const classeId = parseInt(req.params.idclasses, 10)
      const subjectHasClasses = await ClasseSubjectService.showSubjectsInClasse(
        classeId
      )
      return res.status(200).send(subjectHasClasses)
    } catch (errors) {
      return next(errors)
    }
  },
}
