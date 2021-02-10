const ProblemService = require('../services/ProblemService')

module.exports = {
  async create(req, res, next) {
    try {
      const { idsubjects, content, file } = req.body
      const idstudents = req.user.idusers
      const student = await req.user.getStudent()
      const { idclasses } = student
      const problem = await ProblemService.create(
        idstudents,
        idclasses,
        idsubjects,
        content,
        file
      )
      return res.status(201).send({
        idproblems: problem.idproblems,
      })
    } catch (errors) {
      return next(errors)
    }
  },
  async isSolved(req, res, next) {
    try {
      const { status } = req.body
      const { idproblems } = req.params
      const idstudents = req.user.idusers

      const problem = await ProblemService.updateStatus(
        idstudents,
        idproblems,
        status
      )
      return res.status(201).send({
        idproblems: problem.idproblems,
      })
    } catch (errors) {
      return next(errors)
    }
  },
  async delete(req, res, next) {
    try {
      const { idproblems } = req.params
      const idstudents = req.user.idusers

      await ProblemService.delete(idstudents, idproblems)
      return res.sendStatus(204)
    } catch (errors) {
      return next(errors)
    }
  },
  async showProblemInSubjectClasse(req, res, next) {
    try {
      const { idclasses, idsubjects } = req.params

      const problems = await ProblemService.showProblemInSubjectClasse(
        idclasses,
        idsubjects
      )
      return res.send(problems)
    } catch (errors) {
      return next(errors)
    }
  },
}
