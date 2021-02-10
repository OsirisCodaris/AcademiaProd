const Sequelize = require('sequelize')
const {
  Problems,
  subjectsHasClasses,
  Users,
  Students,
  Responses,
} = require('../models')
const RequestError = require('../config/RequestError')
const ServerError = require('../config/ServerError')

module.exports = {
  async create(idstudents, idclasses, idsubjects, content, file) {
    try {
      const subjectshasclasses = await subjectsHasClasses.findOne({
        where: {
          idclasses,
          idsubjects,
        },
      })
      const problem = await Problems.create({
        idstudents,
        idsubjectshasclasses: subjectshasclasses.idsubjectshasclasses,
        content,
        file,
      })

      return problem
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
  async updateStatus(idstudents, idproblems, status) {
    try {
      const problem = await Problems.findByPk(idproblems)
      if (!problem) {
        const error = new RequestError('Problème')
        error.notExistOrDelete()
        throw error
      }
      if (problem.idstudents !== idstudents) {
        const error = new RequestError('Problème')
        error.unAuthorized()
        throw error
      }
      await problem.update({ status })
      return problem
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
  async delete(idstudents, idproblems) {
    try {
      const problem = await Problems.findOne({
        where: {
          idproblems,
        },
      })
      if (!problem) {
        const error = new RequestError('Problème')
        error.notExistOrDelete()
        throw error
      }
      if (problem.idstudents !== idstudents) {
        const error = new RequestError('Problème')
        error.unAuthorized()
        throw error
      }
      await problem.destroy()
      return true
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
  async showProblemInSubjectClasse(idclasses, idsubjects) {
    try {
      const subjecthasclass = await subjectsHasClasses.findOne({
        where: {
          idclasses,
          idsubjects,
        },
      })
      if (!subjecthasclass) {
        const error = new RequestError('Matière-Classe')
        error.notExistOrDelete()
        throw error
      }
      const problem = await subjecthasclass.getProblems({
        group: ['idproblems'],
        attributes: {
          include: [
            [
              Sequelize.fn('COUNT', Sequelize.col('Responses.idresponses')),
              'countResponse',
            ],
            [
              Sequelize.fn('', Sequelize.col('Student.User.fullname')),
              'fullname',
            ],
          ],
        },
        include: [
          {
            model: Responses,
            attributes: [],
          },
          {
            model: Students,
            attributes: [],
            include: [
              {
                model: Users,
                attributes: [],
              },
            ],
          },
        ],
        order: [['createdAt', 'DESC']],
      })
      return { count: problem.length, rows: problem }
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
}
