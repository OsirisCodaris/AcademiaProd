const express = require('express')

const router = express.Router()
const AuthentificationControllers = require('../controllers/AuthentificationControllers')

router.route('/login').post(AuthentificationControllers.login)
router.route('/token').post(AuthentificationControllers.token)
router.route('/resetpassword').post(AuthentificationControllers.resetPassword)
router.route('/password').post(AuthentificationControllers.newPassword)

module.exports = router
