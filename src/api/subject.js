const express = require('express')

const router = express.Router()
const SubjectService = require('../services/SubjectService')
const ClasseSubjectService = require('../services/ClasseSubjectService')
const isAuthenticate = require('../middleware/IsAuthenticate')
const adminOnly = require('../middleware/adminOnly')
const NamePolicy = require('../policies/NamePolicy')

router
  .route('/subjects')
  .post(isAuthenticate, adminOnly, NamePolicy, SubjectService.create)
  .get(SubjectService.showAll)

router
  .route('/subjects/:id([0-9]+)')
  .put(isAuthenticate, adminOnly, NamePolicy, SubjectService.update)
  .delete(isAuthenticate, adminOnly, SubjectService.delete)
router
  .route('/classes/:idclasses([0-9]+)/subjects')
  .get(ClasseSubjectService.showSubjectsInClasse)
  .post(isAuthenticate, adminOnly, ClasseSubjectService.associate)

module.exports = router
