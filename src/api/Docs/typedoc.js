const express = require('express')

const router = express.Router()
const TypeControllers = require('../../controllers/TypesDocControllers')
const NamePolicy = require('../../policies/NamePolicy')
const isAuthenticate = require('../../middleware/IsAuthenticate')
const adminOnly = require('../../middleware/adminOnly')

router
  .route('/typedocs')
  .get(TypeControllers.showAll)
  .post(isAuthenticate, adminOnly, NamePolicy, TypeControllers.create)

router
  .route('/typedocs/:id')
  .put(isAuthenticate, adminOnly, NamePolicy, TypeControllers.update)
  .delete(isAuthenticate, adminOnly, TypeControllers.delete)

module.exports = router
