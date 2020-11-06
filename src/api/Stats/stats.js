const express = require('express')

const router = express.Router()
const StatService = require('../../services/StatService')

router.route('/stats/dashboard').get(StatService.dasboard)

module.exports = router
