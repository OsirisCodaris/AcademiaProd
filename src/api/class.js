const express = require('express')

const router = express.Router()
const ClasseService = require('../services/ClasseService')
const NamePolicy = require('../policies/NamePolicy')
const ClasseSubjectService = require('../services/ClasseSubjectService')
const isAuthenticate = require('../middleware/IsAuthenticate')
const adminOnly = require('../middleware/adminOnly')

router
  .route('/classes')
  .post(isAuthenticate, adminOnly, NamePolicy, ClasseService.create)
  .get(ClasseService.showAll)

router
  .route('/classes/:id([0-9]+)')
  .put(isAuthenticate, adminOnly, NamePolicy, ClasseService.update)
  .delete(isAuthenticate, adminOnly, ClasseService.delete)
router
  .route('/subjects/:idsubjects([0-9]+)/classes')
  .get(ClasseSubjectService.showClassesHavSubject)
module.exports = router
