const ClasseService = require('../services/ClasseService')
const ClasseSubjectService = require('../services/ClasseSubjectService')

module.exports = {
  async create(req, res, next) {
    try {
      const classe = await ClasseService.create(req.body.name)
      return res.status(201).send({
        idclasses: classe.idclasses,
      })
    } catch (errors) {
      return next(errors)
    }
  },
  async showAll(req, res, next) {
    try {
      const classe = await ClasseService.showAll()
      return res.send(classe)
    } catch (errors) {
      return next(errors)
    }
  },
  async update(req, res, next) {
    try {
      const classeId = parseInt(req.params.id, 10)
      const { name } = req.body
      const classe = await ClasseService.update(classeId, name)
      return res.status(201).send({
        idclasses: classe.idclasses,
      })
    } catch (errors) {
      return next(errors)
    }
  },
  async delete(req, res, next) {
    try {
      const classeId = parseInt(req.params.id, 10)
      await ClasseService.delete(classeId)
      return res.sendStatus(204)
    } catch (errors) {
      return next(errors)
    }
  },
  async showClasseSubject(req, res, next) {
    try {
      const subjectId = parseInt(req.params.idsubjects, 10)
      const subjectHasClasses = await ClasseSubjectService.showClassesHavSubject(
        subjectId
      )
      return res.status(200).send(subjectHasClasses)
    } catch (errors) {
      return next(errors)
    }
  },
}
