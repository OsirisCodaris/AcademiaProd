const express = require('express')

const router = express.Router()
const StatControllers = require('../../controllers/StatControllers')

router
  .route('/forum/classes/:idclasses([0-9]+)/subjects/stats')
  .get(StatControllers.showSubjectsInClasseNstatForum)

router
  .route('/forum/subjects/:idsubjects([0-9]+)/classes/stats')
  .get(StatControllers.showClassesHavSubjectNstatForum)
module.exports = router
