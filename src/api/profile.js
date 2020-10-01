const express = require('express')

const router = express.Router()
const StudentService = require('../services/StudentService')
const TeacherService = require('../services/TeacherService')
const TeacherPolicy = require('../policies/TeacherPolicy')
const UserService = require('../services/UserService')
const UserPolicy = require('../policies/UsersPolicy')

router
  .route('/students')
  .post(UserPolicy.register, UserService.create, StudentService.create)

router
  .route('/teachers')
  .post(
    UserPolicy.register,
    TeacherPolicy.register,
    UserService.create,
    TeacherService.create
  )

module.exports = router
