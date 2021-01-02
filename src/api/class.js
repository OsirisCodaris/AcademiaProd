const express = require('express')

const router = express.Router()
const ClasseControllers = require('../controllers/ClasseControllers')
const NamePolicy = require('../policies/NamePolicy')
const isAuthenticate = require('../middleware/IsAuthenticate')
const adminOnly = require('../middleware/adminOnly')

router
  .route('/classes')
  .post(isAuthenticate, adminOnly, NamePolicy, ClasseControllers.create)
  .get(ClasseControllers.showAll)

router
  .route('/classes/:id([0-9]+)')
  .put(isAuthenticate, adminOnly, NamePolicy, ClasseControllers.update)
  .delete(isAuthenticate, adminOnly, ClasseControllers.delete)
router
  .route('/subjects/:idsubjects([0-9]+)/classes')
  .get(ClasseControllers.showClasseSubject)
module.exports = router
