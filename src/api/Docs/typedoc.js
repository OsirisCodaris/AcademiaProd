const express = require('express')

const router = express.Router()
const TypeService = require('../../services/TypesDocService')
const NamePolicy = require('../../policies/NamePolicy')
const isAuthenticate = require('../../middleware/IsAuthenticate')
const adminOnly = require('../../middleware/adminOnly')

router
  .route('/typedocs')
  .get(TypeService.showAll)
  .post(isAuthenticate, adminOnly, NamePolicy, TypeService.create)

router
  .route('/typedocs/:id')
  .put(isAuthenticate, adminOnly, NamePolicy, TypeService.update)
  .delete(isAuthenticate, adminOnly, TypeService.delete)

module.exports = router
