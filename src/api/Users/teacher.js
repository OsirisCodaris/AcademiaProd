const express = require('express')

const router = express.Router()
const TeacherService = require('../../services/TeacherService')
const TeacherPolicy = require('../../policies/TeacherPolicy')
const UserService = require('../../services/UserService')
const UserPolicy = require('../../policies/UsersPolicy')

router
  .route('/teachers')
  .post(
    UserPolicy.register,
    TeacherPolicy.register,
    UserService.create,
    TeacherService.create
  )
router
  .route('/teachers/:id([0-9]+)')
  .put(
    UserPolicy.updated,
    UserService.updated,
    TeacherService.updated
  )
module.exports = router
