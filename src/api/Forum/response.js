const express = require('express')

const router = express.Router()
const ResponseControllers = require('../../controllers/ResponseControllers')
const Uploader = require('../../middleware/Uploader')

const isAuthenticate = require('../../middleware/IsAuthenticate')
const studentOnly = require('../../middleware/studentOnly')
const ResponsePolicy = require('../../policies/ResponsePolicy')

router
  .route('/problems/:idproblems([0-9]+)/responses')
  .get(isAuthenticate, ResponseControllers.showResponseInProblem)
  .post(
    isAuthenticate,
    Uploader.fileUpload,
    ResponsePolicy.create,
    ResponseControllers.create
  )
router
  .route('/responses/:idresponses([0-9]+)/solved')
  .put(isAuthenticate, studentOnly, ResponseControllers.isSolved)

router
  .route('/responses/:idresponses([0-9]+)')
  .put(isAuthenticate, studentOnly, ResponseControllers.delete)

module.exports = router
