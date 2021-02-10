const Sequelize = require('sequelize')
const { subjectsHasClasses, docAnswers, Notions } = require('../models')
const RequestError = require('../config/RequestError')
const ServerError = require('../config/ServerError')

module.exports = {
  async associate(doc, DocCreate) {
    try {
      const idsubjects = parseInt(DocCreate.idsubjects, 10)
      const classesID = DocCreate.idclasses
      const errors = []
      // si on modifie les association d'une classe avec des matières on réinitialise
      // await doc.setDocInSubjectClasses(null)
      // On parcours le tableau reçu et on ajoute les association entre les matiere et les classe
      if (Array.isArray(classesID)) {
        for (const idclasses of classesID) {
          const subjecthasclass = await subjectsHasClasses.findOne({
            where: {
              idclasses,
              idsubjects,
            },
          })
          if (!subjecthasclass) {
            errors.push(idclasses)
          }
          await doc.setDocInSubjectClasses(subjecthasclass)
        }
      } else {
        const subjecthasclass = await subjectsHasClasses.findOne({
          where: {
            idclasses: classesID,
            idsubjects,
          },
        })
        if (!subjecthasclass) {
          errors.push(classesID)
        }
        await doc.addDocInSubjectClasses(subjecthasclass)
      }

      // On renvoie le statut crée et la liste des erreurs rencontre (les matières ui n'existe pas)
      return errors
    } catch (errors) {
      doc.destroy()
      throw new ServerError(errors)
    }
  },
  async showByClasseSubject(idclasses, idsubjects, idtypedocs) {
    try {
      const subjecthasclass = await subjectsHasClasses.findOne({
        where: {
          idclasses,
          idsubjects,
        },
      })
      if (!subjecthasclass) {
        const error = new RequestError('Document')
        error.Empty()
        throw error
      }
      if (idtypedocs) {
        const docInClasseSubject = await subjecthasclass.getDocInSubjectClasses(
          {
            where: { idtypedocs },
            attributes: {
              include: [
                [
                  Sequelize.fn('', Sequelize.col('docAnswer.pathfile')),
                  'pathAnswer',
                ],
                [Sequelize.col('docAnswer.status'), 'statusAnswer'],
                [Sequelize.fn('', Sequelize.col('Notion.notions')), 'notions'],
              ],
              // exclude: ['idsubjects', 'idsubjectshasclasses'],
            },
            include: [
              {
                model: docAnswers,
                attributes: [],
              },
              {
                model: Notions,
                attributes: [],
              },
            ],
          }
        )
        const count = await subjecthasclass.countDocInSubjectClasses({
          where: { idtypedocs },
        })
        return { count, docInClasseSubject }
      }
      const docInClasseSubject = await subjecthasclass.getDocInSubjectClasses({
        attributes: {
          include: [
            [
              Sequelize.fn('', Sequelize.col('docAnswer.pathfile')),
              'pathAnswer',
            ],
            [Sequelize.col('docAnswer.status'), 'statusAnswer'],
            [Sequelize.fn('', Sequelize.col('Notion.notions')), 'notions'],
          ],
          // exclude: ['idsubjects', 'idsubjectshasclasses'],
        },
        include: [
          {
            model: docAnswers,
            attributes: [],
          },
          {
            model: Notions,
            attributes: [],
          },
        ],
      })
      const count = await subjecthasclass.countDocInSubjectClasses()
      return { count, docInClasseSubject }
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
  async showDocRandomInClass(idclasses) {
    try {
      const subjecthasclasses = await subjectsHasClasses.findOne({
        where: {
          idclasses,
        },
        order: [Sequelize.literal('RAND()')],
      })
      if (!subjecthasclasses) {
        const error = new RequestError('Document')
        error.Empty()
        throw error
      }

      const docInClasseSubject = await subjecthasclasses.getDocInSubjectClasses(
        {
          order: [Sequelize.literal('RAND()')],
          limit: 7,
          attributes: {
            include: [
              [
                Sequelize.fn('', Sequelize.col('docAnswer.pathfile')),
                'pathAnswer',
              ],
              [
                Sequelize.fn('', Sequelize.col('docAnswer.status')),
                'statusAnswer',
              ],
              [Sequelize.fn('', Sequelize.col('Notion.notions')), 'notions'],
            ],
            // exclude: ['idsubjects', 'idsubjectshasclasses'],
          },
          include: [
            {
              model: docAnswers,
              attributes: [],
            },
            {
              model: Notions,
              attributes: [],
            },
          ],
        }
      )
      return docInClasseSubject
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
  async showDocRandomInSubject(idsubjects) {
    try {
      const subjecthasclasses = await subjectsHasClasses.findOne({
        where: {
          idsubjects,
        },
        order: [Sequelize.literal('RAND()')],
        limit: 1,
      })
      if (!subjecthasclasses) {
        const error = new RequestError('Document')
        error.Empty()
        throw error
      }

      const docInClasseSubject = await subjecthasclasses.getDocInSubjectClasses(
        {
          order: [Sequelize.literal('RAND()')],
          limit: 7,
          attributes: {
            include: [
              [
                Sequelize.fn('', Sequelize.col('docAnswer.pathfile')),
                'pathAnswer',
              ],
              [Sequelize.col('docAnswer.status'), 'statusAnswer'],
              [Sequelize.fn('', Sequelize.col('Notion.notions')), 'notions'],
            ],
            // exclude: ['idsubjects', 'idsubjectshasclasses'],
          },
          include: [
            {
              model: docAnswers,
              attributes: [],
            },
            {
              model: Notions,
              attributes: [],
            },
          ],
        }
      )
      return docInClasseSubject
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
}
