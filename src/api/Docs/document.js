const express = require('express')

const router = express.Router()
const DocService = require('../../services/DocService')
const DocAnswserService = require('../../services/DocAnsService')
const NotionService = require('../../services/NotionService')
const DocHasSubjectHasClass = require('../../services/DocHasSubjectHasClass')
const DocPolicy = require('../../policies/DocPolicy')
const Uploader = require('../../middleware/Uploader')
const isAuthenticate = require('../../middleware/IsAuthenticate')
const adminOnly = require('../../middleware/adminOnly')

router
  .route('/documents')
  .get(DocService.showAll)
  .post(
    isAuthenticate,
    adminOnly,
    Uploader.docUpload,
    DocPolicy.created,
    DocService.created,
    DocAnswserService.created,
    NotionService.created,
    DocHasSubjectHasClass.associate
  )

router
  .route('/documents/:id([0-9]+)')
  .get(DocService.show) // voir un document spécifique
  .put(
    isAuthenticate,
    adminOnly,
    Uploader.docUpload,
    DocPolicy.updated,
    DocService.updated,
    DocAnswserService.updated,
    NotionService.updated,
    DocHasSubjectHasClass.associate
  )
  .delete(isAuthenticate, adminOnly, DocService.deleted)

router
  .route('/classes/:idclasses([0-9]+)/subjects/:idsubjects([0-9]+)/documents')
  .get(DocHasSubjectHasClass.showByClasseSubject)
module.exports = router
