const express = require('express')

const router = express.Router()
const StudentControllers = require('../../controllers/StudentControllers')

const UserPolicy = require('../../policies/UsersPolicy')

router.route('/students').post(UserPolicy.register, StudentControllers.create)
router
  .route('/students/:id([0-9]+)')
  .put(UserPolicy.updated, StudentControllers.update)
module.exports = router
