const express = require('express')

const router = express.Router()
const SubjectControllers = require('../controllers/SubjectControllers')

const isAuthenticate = require('../middleware/IsAuthenticate')
const adminOnly = require('../middleware/adminOnly')
const NamePolicy = require('../policies/NamePolicy')

router
  .route('/subjects')
  .post(isAuthenticate, adminOnly, NamePolicy, SubjectControllers.create)
  .get(SubjectControllers.showAll)

router
  .route('/subjects/:id([0-9]+)')
  .put(isAuthenticate, adminOnly, NamePolicy, SubjectControllers.update)
  .delete(isAuthenticate, adminOnly, SubjectControllers.delete)
router
  .route('/classes/:idclasses([0-9]+)/subjects')
  .get(SubjectControllers.showSubjectsInClasse)
  .post(isAuthenticate, adminOnly, SubjectControllers.associate)

module.exports = router
