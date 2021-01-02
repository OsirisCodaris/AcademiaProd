const express = require('express')

const router = express.Router()
const TeacherControllers = require('../../controllers/TeacherControllers')
const TeacherPolicy = require('../../policies/TeacherPolicy')
const UserPolicy = require('../../policies/UsersPolicy')

router
  .route('/teachers')
  .post(UserPolicy.register, TeacherPolicy.register, TeacherControllers.create)
router
  .route('/teachers/:id([0-9]+)')
  .put(UserPolicy.updated, TeacherControllers.update)
module.exports = router
