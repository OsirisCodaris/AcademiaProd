const Sequelize = require('sequelize')
const { Responses, Problems, Users } = require('../models')
const { UserRole } = require('../utils/UserUtils')
const RequestError = require('../config/RequestError')
const ServerError = require('../config/ServerError')

module.exports = {
  async create(user, idproblems, content, file) {
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
      const isTeacher = await user.getTeacher()
      if (problem.idteachers !== null && isTeacher) {
        console.log(problem.idteachers)
        if (user.idusers !== problem.idteachers) {
          const error = new RequestError('Problème')
          error.teacherCantWrite()
          throw error
        }
      }
      if (isTeacher && problem.idteachers == null) {
        await problem.update({
          idteachers: user.idusers,
        })
      }

      const { idusers } = user
      const response = await Responses.create({
        idusers,
        idproblems,
        content,
        file,
      })

      return response
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
  async updateStatus(idusers, idresponses, status) {
    try {
      const response = await Responses.findByPk(idresponses)
      if (!response) {
        const error = new RequestError('Réponse')
        error.notExistOrDelete()
        throw error
      }
      const problem = await response.getProblem()
      if (problem.idstudents !== idusers) {
        const error = new RequestError('Réponse')
        error.unAuthorized()
        throw error
      }
      await response.update({ status })
      const countResponseResolv = await problem.countResponses({
        where: {
          status: true,
        },
      })
      if (countResponseResolv > 0) {
        await problem.update({ status: true })
      } else {
        await problem.update({ status: false })
      }
      return response
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
  async delete(idusers, idresponses) {
    try {
      const response = await Responses.findOne({
        where: {
          idresponses,
        },
      })
      if (!response) {
        const error = new RequestError('Réponse')
        error.notExistOrDelete()
        throw error
      }
      if (response.idusers !== idusers) {
        const error = new RequestError('Réponse')
        error.unAuthorized()
        throw error
      }
      await response.destroy()
      return true
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
  async showResponseInProblem(idproblems) {
    try {
      const responses = await Responses.findAndCountAll({
        where: {
          idproblems,
        },
        attributes: {
          include: [
            [Sequelize.fn('', Sequelize.col('User.idusers')), 'idusers'],
            [Sequelize.fn('', Sequelize.col('User.fullname')), 'fullname'],
          ],
        },
        include: [
          {
            model: Users,
            attributes: ['idusers'],
          },
        ],
        order: [['createdAt', 'DESC']],
      })
      const map = await responses.rows.map(async (element) => {
        const el = element.toJSON()
        el.role = await UserRole(element.User)
        return el
      })

      return Promise.all(map).then((rows) => {
        return { count: responses.count, rows }
      })
    } catch (errors) {
      return new ServerError(errors)
    }
  },
}
