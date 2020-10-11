const express = require('express')

const router = express.Router()
const TypeService = require('../../services/TypesDocService')
const NamePolicy = require('../../policies/NamePolicy')

router
  .route('/typedocs')
  .get(TypeService.show)
  .post(NamePolicy, TypeService.create)

router
  .route('/typedocs/:id')
  .put(NamePolicy, TypeService.update)
  .delete(TypeService.delete)

module.exports = router
