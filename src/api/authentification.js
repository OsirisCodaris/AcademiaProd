const express = require('express')

const router = express.Router()
const AuthentificationService = require('../services/AuthentificationService')

router.route('/login').post(AuthentificationService.login)
router.route('/token').post(AuthentificationService.token)

module.exports = router
