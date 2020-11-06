const express = require('express')

const router = express.Router()
const AdminService = require('../../services/AdminService')
const UserService = require('../../services/UserService')
const UserPolicy = require('../../policies/UsersPolicy')
const isAuthenticate = require('../../middleware/IsAuthenticate')
const codarisOnly = require('../../middleware/adminOnly')

router
  .route('/admins')
  .get(AdminService.showAll)
  .post(
    isAuthenticate,
    codarisOnly,
    UserPolicy.register,
    UserService.create,
    AdminService.create
  )

router
  .route('/admins/:id([0-9]+)')
  .put(
    isAuthenticate,
    codarisOnly,
    UserPolicy.updated,
    UserService.updated,
    AdminService.updated
  )
  .delete(isAuthenticate, codarisOnly, AdminService.delete)

module.exports = router
