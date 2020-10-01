const express = require('express')

const router = express.Router()
const SubjectService = require('../services/SubjectService')
const NamePolicy = require('../policies/NamePolicy')

router.route('/subjects').post(NamePolicy, SubjectService.create)

router
  .route('/subjects/:id')
  .put(NamePolicy, SubjectService.update)
  .delete(SubjectService.delete)

module.exports = router
