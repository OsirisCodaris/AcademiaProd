const express = require('express')

const router = express.Router()
const StatService = require('../../services/StatService')
const ClasseSubjectService = require('../../services/ClasseSubjectService')

router.route('/stats/dashboard').get(StatService.dasboard)
router
  .route('/classes/:idclasses([0-9]+)/subjects/stats')
  .get(ClasseSubjectService.showSubjectsInClasseNstat)
router
  .route('/subjects/:idsubjects([0-9]+)/classes/stats')
  .get(ClasseSubjectService.showClassesHavSubjectNstat)
module.exports = router
