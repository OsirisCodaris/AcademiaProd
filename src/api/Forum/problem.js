const express = require('express')

const router = express.Router()
const ProblemControllers = require('../../controllers/ProblemControllers')
const Uploader = require('../../middleware/Uploader')

const isAuthenticate = require('../../middleware/IsAuthenticate')
const studentOnly = require('../../middleware/studentOnly')
const ProblemPolicy = require('../../policies/ProblemPolicy')

router
  .route('/problems')
  .post(
    isAuthenticate,
    studentOnly,
    Uploader.fileUpload,
    ProblemPolicy.create,
    ProblemControllers.create
  )
router
  .route('/problems/:idproblems([0-9]+)/solved')
  .put(isAuthenticate, studentOnly, ProblemControllers.isSolved)

router
  .route('/problems/:idproblems([0-9]+)')
  .delete(isAuthenticate, studentOnly, ProblemControllers.delete)

router
  .route('/classes/:idclasses([0-9]+)/subjects/:idsubjects([1-9]+)/problems')
  .get(ProblemControllers.showProblemInSubjectClasse)

module.exports = router
