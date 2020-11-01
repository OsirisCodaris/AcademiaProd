const express = require('express')

const router = express.Router()
const DocService = require('../../services/DocService')
const DocAnswserService = require('../../services/DocAnsService')
const DocHasSubjectHasClass = require('../../services/DocHasSubjectHasClass')
const DocPolicy = require('../../policies/DocPolicy')
const Uploader = require('../../middleware/Uploader')

router
  .route('/documents')
  .get(DocService.showAll)
  .post(
    Uploader.docUpload,
    DocPolicy.created,
    DocService.created,
    DocAnswserService.created,
    DocHasSubjectHasClass.associate
  )

router
  .route('/documents/:id([0-9]+)')
  .get(DocService.show) // voir un document spécifique
  .put(
    Uploader.docUpload,
    DocPolicy.updated,
    DocService.updated,
    DocAnswserService.updated,
    DocHasSubjectHasClass.associate
  )
  .delete(DocService.deleted)

router
  .route('/classes/:idclasses([0-9]+)/subjects/:idsubjects([0-9]+)/documents')
  .get(DocHasSubjectHasClass.showByClasseSubject)
module.exports = router
