const Sequelize = require('sequelize')
const { Classes, Subjects, docAnswers } = require('../models')
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

      const errors = []
      if (idsubjects.length) {
        const addSubjects = []

        for (const element of idsubjects) {
          const subject = await Subjects.findByPk(element)
          if (!subject) {
            errors.push(element)
          } else {
            addSubjects.push(subject)
          }
        }
        await classe.setSubjects(addSubjects)
        // On renvoie le statut crée et la liste des erreurs rencontre (les matières ui n'existe pas)
        return errors
      }

      const error = new RequestError('Matières')
      error.Empty()
      throw error
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

      const subjectHasClasses = await classe.getSubjects()
      const count = await classe.countSubjects()
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

      const subjectHasClasses = await subject.getClasses()
      const count = await subject.countClasses()
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
      const subjectHasClasses = []

      const classe = await Classes.findByPk(idclasses)
      if (!classe) {
        const error = new RequestError('Classe')
        error.notExistOrDelete()
        throw error
      }
      const subjectHsClasses = await classe.getSubjects()
      await subjectHsClasses.forEach(async (subjectHasClasse) => {
        const element = subjectHasClasse.toJSON()
        // const documents = subjectHasClasse.subjectsHasClasses
        subjectHasClasse.subjectsHasClasses
          .getDocInSubjectClasses({
            attributes: [
              // on récupère le nombre de corrigé et de document
              [
                Sequelize.fn('COUNT', Sequelize.col('docAnswer.iddocanswers')),
                'docAnswersCount',
              ],
              [
                Sequelize.fn('COUNT', Sequelize.col('Documents.iddocuments')),
                'docCount',
              ],
            ],
            include: [
              {
                model: docAnswers,
                attributes: [],
              },
            ],
          })
          .then((doc) => {
            element.countAnswer = doc ? doc[0].toJSON().docAnswersCount : 0
            element.countDocument = doc ? doc[0].toJSON().docCount : 0
          })

        subjectHasClasses.push(element)
      })
      const count = await classe.countSubjects()
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
  async showClassesHavSubjectNstat(idsubjects) {
    try {
      const subject = await Subjects.findByPk(idsubjects)
      if (!subject) {
        const error = new RequestError('Matière')
        error.notExistOrDelete()
        throw error
      }

      const subjectHasClasses = []
      ;(await subject.getClasses()).forEach(async (subjectHasClasse) => {
        const element = subjectHasClasse.toJSON()
        subjectHasClasse.subjectsHasClasses
          .getDocInSubjectClasses({
            attributes: [
              // on récupère le nombre de corrigé et de document
              [
                Sequelize.fn('COUNT', Sequelize.col('docAnswer.iddocanswers')),
                'docAnswersCount',
              ],
              [
                Sequelize.fn('COUNT', Sequelize.col('Documents.iddocuments')),
                'docCount',
              ],
            ],
            include: [
              {
                model: docAnswers,
                attributes: [],
              },
            ],
          })
          .then((doc) => {
            element.countAnswer = doc ? doc[0].toJSON().docAnswersCount : 0
            element.countDocument = doc ? doc[0].toJSON().docCount : 0
          })
        subjectHasClasses.push(element)
      })
      const count = await subject.countClasses()
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
}
