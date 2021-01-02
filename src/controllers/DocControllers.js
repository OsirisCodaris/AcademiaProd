const DocService = require('../services/DocService')
const DocHasSubjectHasClass = require('../services/DocHasSubjectHasClass')

module.exports = {
  async create(req, res, next) {
    try {
      const result = await DocService.create(req.body)
      return res.status(201).send({
        iddocuments: result.doc.iddocuments,
        ClassError: result.errors,
      })
    } catch (errors) {
      return next(errors)
    }
  },
  async update(req, res, next) {
    try {
      const docId = parseInt(req.params.id, 10)
      const doc = await DocService.update(docId, req.body)
      return res.status(201).send({
        iddocs: doc.iddocuments,
      })
    } catch (errors) {
      return next(errors)
    }
  },
  async delete(req, res, next) {
    try {
      const docId = parseInt(req.params.id, 10)
      await DocService.delete(docId)
      return res.sendStatus(204)
    } catch (errors) {
      return next(errors)
    }
  },
  async showAll(req, res, next) {
    try {
      const doc = await DocService.showAll()
      return res.send(doc)
    } catch (errors) {
      return next(errors)
    }
  },
  async show(req, res, next) {
    try {
      const docId = parseInt(req.params.id, 10)
      const doc = await DocService.show(docId)
      return res.send({ doc })
    } catch (errors) {
      return next(errors)
    }
  },
  async showByClasseSubject(req, res, next) {
    try {
      const idtypedocs = parseInt(req.query.typedocs, 10)
      const { idclasses, idsubjects } = req.params
      const doc = await DocHasSubjectHasClass.showByClasseSubject(
        idclasses,
        idsubjects,
        idtypedocs
      )
      return res.send(doc)
    } catch (errors) {
      return next(errors)
    }
  },
  async showDocRandomInClass(req, res, next) {
    try {
      const { idclasses } = req.params
      const docInClasseSubject = await DocHasSubjectHasClass.showDocRandomInClass(
        idclasses
      )
      return res.status(200).send({ docInClasseSubject })
    } catch (errors) {
      return next(errors)
    }
  },
  async showDocRandomInSubject(req, res, next) {
    try {
      const { idsubjects } = req.params
      const docInClasseSubject = await DocHasSubjectHasClass.showDocRandomInSubject(
        idsubjects
      )
      return res.status(200).send({ docInClasseSubject })
    } catch (errors) {
      return next(errors)
    }
  },
}
