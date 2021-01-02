const express = require('express')

const router = express.Router()

const DocPolicy = require('../../policies/DocPolicy')
const Uploader = require('../../middleware/Uploader')
const isAuthenticate = require('../../middleware/IsAuthenticate')
const adminOnly = require('../../middleware/adminOnly')
const DocControllers = require('../../controllers/DocControllers')

router
  .route('/documents')
  .get(DocControllers.showAll)
  .post(
    isAuthenticate,
    adminOnly,
    Uploader.docUpload,
    DocPolicy.created,
    DocControllers.create
  )

router
  .route('/documents/:id([0-9]+)')
  .get(DocControllers.show) // voir un document spécifique
  .put(
    isAuthenticate,
    adminOnly,
    Uploader.docUpload,
    DocPolicy.updated,
    DocControllers.update
  )
  .delete(isAuthenticate, adminOnly, DocControllers.delete)

router
  .route('/classes/:idclasses([0-9]+)/subjects/:idsubjects([0-9]+)/documents')
  .get(DocControllers.showByClasseSubject)
router
  .route('/classes/:idclasses([0-9]+)/documents/random')
  .get(DocControllers.showDocRandomInClass)
router
  .route('/subjects/:idsubjects([0-9]+)/documents/random')
  .get(DocControllers.showDocRandomInSubject)
module.exports = router
