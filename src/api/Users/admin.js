const express = require('express')

const router = express.Router()
const AdminService = require('../../services/AdminService')
const UserService = require('../../services/UserService')
const UserPolicy = require('../../policies/UsersPolicy')
const isAuthenticate = require('../../middleware/IsAuthenticate')
const codarisOnly = require('../../middleware/adminOnly')
const {Mailer} = require('../../utils/Mailer')

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
router.post('/mailer',(req,res,next)=>{
    const {from, subject, message } = req.body
    const to = "administrator@academiagabon.ga"
    Mailer(from,to,subject,message)
    return res.status(200).send({message: "Votre message a été envoyé. Merci!"})
  })
module.exports = router
