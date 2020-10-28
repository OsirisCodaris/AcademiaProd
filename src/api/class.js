const express = require('express')

const router = express.Router()
const ClasseService = require('../services/ClasseService')
const NamePolicy = require('../policies/NamePolicy')

router
  .route('/classes')
  .post(NamePolicy, ClasseService.create)
  .get(ClasseService.showAll)

router
  .route('/classes/:id([0-9]+)')
  .put(NamePolicy, ClasseService.update)
  .delete(ClasseService.delete)

module.exports = router
