const express = require('express')

const router = express.Router()
const NotificationControllers = require('../../controllers/NotificationControllers')

const isAuthenticate = require('../../middleware/IsAuthenticate')

router
  .route('/problems/:idproblems([0-9]+)/notifications')
  .post(isAuthenticate, NotificationControllers.createOrUpdate)
router
  .route('/notifications')
  .put(isAuthenticate, NotificationControllers.updateTokenFcm)

router
  .route('/users/:idusers([0-9]+)/problems/:idproblems([0-9]+)/notifications')
  .get(isAuthenticate, NotificationControllers.showTokenFcm)

module.exports = router
