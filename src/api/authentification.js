const express = require('express')

const router = express.Router()
const AuthentificationService = require('../services/AuthentificationService')

router.route('/login').post(AuthentificationService.login)
router.route('/token').post(AuthentificationService.token)
router.route('/resetpassword').post(AuthentificationService.resetPassword)
router.route('/password').post(AuthentificationService.newPassword)

module.exports = router
