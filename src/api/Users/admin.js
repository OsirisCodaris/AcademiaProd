const express = require('express')

const router = express.Router()
const AdminService = require('../../services/AdminService')
const UserService = require('../../services/UserService')
const UserPolicy = require('../../policies/UsersPolicy')

router
  .route('/admins')
  .post(UserPolicy.register, UserService.create, AdminService.create)

module.exports = router
