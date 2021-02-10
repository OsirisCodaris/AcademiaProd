const Sequelize = require('sequelize')
const {
  Classes,
  Subjects,
  Documents,
  docAnswers,
  Problems,
} = require('../models')
const RequestError = require('../config/RequestError')
const ServerError = require('../config/ServerError')

module.exports = {
  async associate(idclasses, idsubjects) {
    try {
      const classe = await Classes.findByPk(idclasses)
      if (!classe) {
        const error = new RequestError('Classe')
        error.notExistOrDelete()
        throw error
      }
      const addSubject = []
      const errors = []
      if (idsubjects.length) {
        for (const element of idsubjects) {
          const subject = await Subjects.findByPk(element)
          if (!subject) {
            errors.push(element)
          } else {
            addSubject.push(subject)
          }
        }
        await classe.setSubjects(addSubject)
      }
      // On renvoie le statut crée et la liste des erreurs rencontre (les matières ui n'existe pas)
      return errors
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
  async showSubjectsInClasse(idclasses) {
    try {
      const classe = await Classes.findByPk(idclasses)
      if (!classe) {
        const error = new RequestError('Classe')
        error.notExistOrDelete()
        throw error
      }

      const subjectHasClasses = await classe.getClassesSubjects({
        attributes: {
          include: [[Sequelize.fn('', Sequelize.col('Subject.name')), 'name']],
        },
        include: [
          {
            model: Subjects,
            attributes: [],
          },
        ],
      })
      const count = subjectHasClasses.length
      return {
        count,
        subjectHasClasses,
      }
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
  async showClassesHavSubject(idsubjects) {
    try {
      console.log(idsubjects)
      const subject = await Subjects.findByPk(idsubjects)
      if (!subject) {
        const error = new RequestError('Matière')
        error.notExistOrDelete()
        throw error
      }

      const subjectHasClasses = await subject.getSubjectsHasClasses({
        attributes: {
          include: [[Sequelize.fn('', Sequelize.col('Class.name')), 'name']],
          exclude: ['idsubjects', 'idsubjectshasclasses'],
        },
        include: [
          {
            model: Classes,
            attributes: [],
          },
        ],
      })
      const count = subjectHasClasses.length
      return {
        count,
        subjectHasClasses,
      }
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
  // stat document et corrigé
  async showSubjectsInClasseNstat(idclasses) {
    try {
      const classe = await Classes.findByPk(idclasses)
      if (!classe) {
        const error = new RequestError('Classe')
        error.notExistOrDelete()
        throw error
      }
      const subjectHsClasses = await classe.getClassesSubjects({
        group: ['idsubjectshasclasses'],
        attributes: {
          include: [
            [Sequelize.fn('', Sequelize.col('Subject.name')), 'name'],
            [
              Sequelize.fn(
                'COUNT',
                Sequelize.col('docInSubjectClasses.iddocuments')
              ),
              'countDocument',
            ],
          ],
        },
        include: [
          {
            model: Subjects,
            attributes: [],
          },
          {
            model: Documents,
            as: 'docInSubjectClasses',
            attributes: [],
            // required: false,
          },
        ],
      })

      const subjectHasClasses = await subjectHsClasses.map(
        async (subjectHasClasse) => {
          const element = subjectHasClasse.toJSON()
          // const documents = subjectHasClasse.subjectsHasClasses
          const doc = await subjectHasClasse.getDocInSubjectClasses({
            attributes: [
              // on récupère le nombre de corrigé et de document
              [
                Sequelize.fn('COUNT', Sequelize.col('docAnswer.iddocanswers')),
                'docAnswersCount',
              ],
            ],
            include: [
              {
                model: docAnswers,
                attributes: [],
              },
            ],
          })

          element.countAnswer = doc ? doc[0].toJSON().docAnswersCount : 0

          return element
        }
      )
      return Promise.all(subjectHasClasses).then((rows) => {
        return {
          count: subjectHasClasses.length,
          subjectHasClasses: rows,
        }
      })
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
  async showSubjectsInClasseNstatForum(idclasses) {
    try {
      const classe = await Classes.findByPk(idclasses)
      if (!classe) {
        const error = new RequestError('Classe')
        error.notExistOrDelete()
        throw error
      }
      const subjectHsClasses = await classe.getClassesSubjects({
        group: ['idsubjectshasclasses'],
        attributes: {
          include: [
            [Sequelize.fn('', Sequelize.col('Subject.name')), 'name'],
            [
              Sequelize.fn('COUNT', Sequelize.col('Problems.idproblems')),
              'countProblem',
            ],
          ],
        },
        include: [
          {
            model: Subjects,
            attributes: [],
          },
          {
            model: Problems,
            attributes: [],
          },
        ],
      })
      const subjectHasClasses = await subjectHsClasses.map(
        async (subjectHasClasse) => {
          const element = subjectHasClasse.toJSON()
          // const documents = subjectHasClasse.subjectsHasClasses
          const doc = await subjectHasClasse.getProblems({
            attributes: [
              [Sequelize.fn('COUNT', Sequelize.col('status')), 'count'],
            ],
            where: {
              status: 1,
            },
          })

          element.countResponse = doc ? doc[0].toJSON().count : 0
          return element
        }
      )
      return Promise.all(subjectHasClasses).then((rows) => {
        return { count: subjectHasClasses.length, subjectHasClasses: rows }
      })
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
  async showClassesHavSubjectNstat(idsubjects) {
    try {
      const subject = await Subjects.findByPk(idsubjects)
      if (!subject) {
        const error = new RequestError('Matière')
        error.notExistOrDelete()
        throw error
      }

      const subjectHsClasses = await subject.getSubjectsHasClasses({
        group: ['idsubjectshasclasses'],
        attributes: {
          include: [
            [Sequelize.fn('', Sequelize.col('Class.name')), 'name'],
            [
              Sequelize.fn(
                'COUNT',
                Sequelize.col('docInSubjectClasses.iddocuments')
              ),
              'countDocument',
            ],
          ],
        },
        include: [
          {
            model: Classes,
            attributes: [],
          },
          {
            model: Documents,
            as: 'docInSubjectClasses',
            attributes: [],
            // required: false,
          },
        ],
      })

      const subjectHasClasses = await subjectHsClasses.map(
        async (subjectHasClasse) => {
          const element = subjectHasClasse.toJSON()
          // const documents = subjectHasClasse.subjectsHasClasses
          const doc = await subjectHasClasse.getDocInSubjectClasses({
            attributes: [
              // on récupère le nombre de corrigé et de document
              [
                Sequelize.fn('COUNT', Sequelize.col('docAnswer.iddocanswers')),
                'docAnswersCount',
              ],
            ],
            include: [
              {
                model: docAnswers,
                attributes: [],
              },
            ],
          })

          element.countAnswer = doc ? doc[0].toJSON().docAnswersCount : 0

          return element
        }
      )
      return Promise.all(subjectHasClasses).then((rows) => {
        return {
          count: subjectHasClasses.length,
          subjectHasClasses: rows,
        }
      })
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
  async showClassesHavSubjectNstatForum(idsubjects) {
    try {
      const subject = await Subjects.findByPk(idsubjects)
      if (!subject) {
        const error = new RequestError('Matière')
        error.notExistOrDelete()
        throw error
      }
      const subjectHsClasses = await subject.getSubjectsHasClasses({
        group: ['idsubjectshasclasses'],
        attributes: {
          include: [
            [Sequelize.fn('', Sequelize.col('Class.name')), 'name'],
            [
              Sequelize.fn('COUNT', Sequelize.col('Problems.idproblems')),
              'countProblem',
            ],
          ],
        },
        include: [
          {
            model: Classes,
            attributes: [],
          },
          {
            model: Problems,
            attributes: [],
          },
        ],
      })
      const subjectHasClasses = await subjectHsClasses.map(
        async (subjectHasClasse) => {
          const element = subjectHasClasse.toJSON()
          // const documents = subjectHasClasse.subjectsHasClasses
          const doc = await subjectHasClasse.getProblems({
            attributes: [
              [Sequelize.fn('COUNT', Sequelize.col('status')), 'count'],
            ],
            where: {
              status: 1,
            },
          })

          element.countResponse = doc ? doc[0].toJSON().count : 0
          return element
        }
      )
      return Promise.all(subjectHasClasses).then((rows) => {
        return { count: subjectHasClasses.length, subjectHasClasses: rows }
      })
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
}
