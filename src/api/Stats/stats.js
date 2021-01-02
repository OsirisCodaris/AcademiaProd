const express = require('express')

const router = express.Router()
const StatControllers = require('../../controllers/StatControllers')

router.route('/stats/dashboard').get(StatControllers.dashboard)
router
  .route('/classes/:idclasses([0-9]+)/subjects/stats')
  .get(StatControllers.showSubjectsInClasseNstat)
router
  .route('/subjects/:idsubjects([0-9]+)/classes/stats')
  .get(StatControllers.showClassesHavSubjectNstat)
module.exports = router
