const express = require('express')

const router = express.Router()
const AppVersionControllers = require('../controllers/AppVersionControllers')
const NamePolicy = require('../policies/NamePolicy')
const isAuthenticate = require('../middleware/IsAuthenticate')
const adminOnly = require('../middleware/adminOnly')

router
  .route('/update')
  .post(isAuthenticate, adminOnly, AppVersionControllers.create)
  .get(AppVersionControllers.showAll)
router.route('/update/lastest').get(AppVersionControllers.showLast)
router
  .route('/update/:id([0-9]+)')
  .put(isAuthenticate, adminOnly, NamePolicy, AppVersionControllers.update)
  .delete(isAuthenticate, adminOnly, AppVersionControllers.delete)

module.exports = router
