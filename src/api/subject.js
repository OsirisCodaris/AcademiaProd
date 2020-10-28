const express = require('express')

const router = express.Router()
const SubjectService = require('../services/SubjectService')
const ClasseSubjectService = require('../services/ClasseSubjectService')

const NamePolicy = require('../policies/NamePolicy')

router
  .route('/subjects')
  .post(NamePolicy, SubjectService.create)
  .get(SubjectService.showAll)

router
  .route('/subjects/:id([0-9]+)')
  .put(NamePolicy, SubjectService.update)
  .delete(SubjectService.delete)
router
  .route('/classes/:idclasses([0-9]+)/subjects')
  .get(ClasseSubjectService.showSubjectsInClasse)
  .post(ClasseSubjectService.associate)

module.exports = router
