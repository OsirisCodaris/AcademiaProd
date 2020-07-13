const express = require('express')

const router = express.Router()
// const AuthentificationController = require('../controllers/AuthentificationController')
// const AuthentificationControllerPolicy = require('../policies/AuthentificationControllerPolicy')

router.route('/register')
/* .post(
    AuthentificationControllerPolicy.register,
    AuthentificationController.register
  ) */

module.exports = router
