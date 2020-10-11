const express = require('express')

const router = express.Router()
const StudentService = require('../../services/StudentService')
const UserService = require('../../services/UserService')
const UserPolicy = require('../../policies/UsersPolicy')

router
  .route('/students')
  .post(UserPolicy.register, UserService.create, StudentService.create)

module.exports = router
