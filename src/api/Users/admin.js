const express = require('express')

const router = express.Router()
const AdminControllers = require('../../controllers/AdminControllers')
const UserPolicy = require('../../policies/UsersPolicy')
const isAuthenticate = require('../../middleware/IsAuthenticate')
const codarisOnly = require('../../middleware/adminOnly')
const MailerControllers = require('../../controllers/MailerControllers')

router.route('/admins').get(AdminControllers.showAll).post(
  // isAuthenticate,
  // codarisOnly,
  UserPolicy.register,
  AdminControllers.create
)

router
  .route('/admins/:id([0-9]+)')
  .put(isAuthenticate, codarisOnly, UserPolicy.updated, AdminControllers.update)
  .delete(isAuthenticate, codarisOnly, AdminControllers.delete)

router.post('/mailer', MailerControllers.send)
module.exports = router
