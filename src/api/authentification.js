const express = require('express')

const router = express.Router()
const AuthentificationService = require('../services/AuthentificationService')
const IsAuthenticate = require('../middleware/IsAuthenticate')

router.route('/login').post(AuthentificationService.login)
router.route('/token').post(IsAuthenticate, AuthentificationService.token)

module.exports = router
