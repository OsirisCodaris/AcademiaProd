const Sequelize = require('sequelize')
const { subjectsHasClasses, docAnswers, Notions } = require('../models')

module.exports = {
  async associate(req, res) {
    try {
      const idsubjects = parseInt(req.body.idsubjects, 10)
      const { doc } = req
      const classesID = req.body.idclasses
      const errors = []
      // si on modifie les association d'une classe avec des matières on réinitialise
      await doc.setDocInSubjectClasses(null)
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
          await doc.addDocInSubjectClasses(subjecthasclass)
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
      return res.status(201).send({
        iddocuments: doc.iddocuments,
        ClassError: errors,
      })
    } catch (error) {
      /* if (req.docAnswer) {
        await req.docAnswer.destroy()
      } */
      if (req.doc) {
        await req.doc.destroy()
      }

      return res.status(500).send({
        error: `Une erreur s'est produite sur le serveur ${error}`,
        status: 500,
      })
    }
  },
  async showByClasseSubject(req, res) {
    try {
      const idtypedocs = parseInt(req.query.typedocs, 10)
      const { idclasses, idsubjects } = req.params
      const subjecthasclass = await subjectsHasClasses.findOne({
        where: {
          idclasses,
          idsubjects,
        },
      })
      if (!subjecthasclass) {
        return res
          .status(404)
          .send({ error: 'Aucun document trouvé', status: 404 })
      }
      if (idtypedocs) {
        const docInClasseSubject = await subjecthasclass.getDocInSubjectClasses(
          {
            where: { idtypedocs },
            include: [
              {
                model: docAnswers,
              },
              {
                model: Notions,
              },
            ],
          }
        )
        const count = await subjecthasclass.countDocInSubjectClasses({
          where: { idtypedocs },
        })
        return res.status(200).send({ count, docInClasseSubject })
      }
      const docInClasseSubject = await subjecthasclass.getDocInSubjectClasses()
      const count = await subjecthasclass.countDocInSubjectClasses()
      return res.status(200).send({ count, docInClasseSubject })
    } catch (error) {
      return res.status(500).send({
        error: `Une erreur s'est produite sur le serveur`,
        status: 500,
      })
    }
  },
  async showDocRandomInClass(req, res) {
    try {
      const { idclasses } = req.params
      const subjecthasclasses = await subjectsHasClasses.findOne({
        where: {
          idclasses,
        },
        order: [Sequelize.literal('RAND()')],
      })
      if (!subjecthasclasses) {
        return res
          .status(404)
          .send({ error: 'Aucun document trouvé', status: 404 })
      }

      const docInClasseSubject = await subjecthasclasses.getDocInSubjectClasses(
        {
          order: [Sequelize.literal('RAND()')],
          limit: 7,
        }
      )
      return res.status(200).send({ docInClasseSubject })
    } catch (error) {
      return res.status(500).send({
        error: `Une erreur s'est produite sur le serveur ${error}`,
        status: 500,
      })
    }
  },
  async showDocRandomInSubject(req, res) {
    try {
      const { idsubjects } = req.params
      const subjecthasclasses = await subjectsHasClasses.findOne({
        where: {
          idsubjects,
        },
        order: [Sequelize.literal('RAND()')],
        limit: 1,
      })
      if (!subjecthasclasses) {
        return res
          .status(404)
          .send({ error: 'Aucun document trouvé', status: 404 })
      }

      const docInClasseSubject = await subjecthasclasses.getDocInSubjectClasses(
        {
          order: [Sequelize.literal('RAND()')],
          limit: 7,
        }
      )
      return res.status(200).send({ docInClasseSubject })
    } catch (error) {
      return res.status(500).send({
        error: `Une erreur s'est produite sur le serveur ${error}`,
        status: 500,
      })
    }
  },
}
