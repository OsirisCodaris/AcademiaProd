const Sequelize = require('sequelize')
const { Classes, Subjects, docAnswers } = require('../models')

module.exports = {
  async associate(req, res) {
    try {
      const idclasses = parseInt(req.params.idclasses, 10)
      const classe = await Classes.findByPk(idclasses)
      if (!classe) {
        return res.status(400).send({
          error: "la classe n'existe pas ou a été supprimé",
          status: 400,
        })
      }
      const { idsubjects } = req.body
      const errors = []
      if (idsubjects.length) {
        const add = []

        for (const element of idsubjects) {
          const subject = await Subjects.findByPk(element)
          if (!subject) {
            errors.push(element)
          } else {
            add.push(subject)
          }
        }
        await classe.setSubjects(add)
        // On renvoie le statut crée et la liste des erreurs rencontre (les matières ui n'existe pas)
        return res.status(201).send({
          error: errors,
        })
      }

      return res.status(400).send({
        error: 'La liste des matières a associé est vide!',
        status: 400,
      })
    } catch (error) {
      return res
        .status(500)
        .send({ error: "Une erreur s'est produite", status: 500 })
    }
  },
  async showSubjectsInClasse(req, res) {
    try {
      const idclasses = parseInt(req.params.idclasses, 10)
      const classe = await Classes.findByPk(idclasses)
      if (!classe) {
        return res.status(404).send({
          error: "la classe n'existe pas ou a été supprimé",
          status: 404,
        })
      }

      const subjectHasClasses = await classe.getSubjects()
      const count = await classe.countSubjects()
      return res.status(200).send({
        count,
        subjectHasClasses,
      })
    } catch (errors) {
      return res.status(500).send({
        error: `Une erreur s'est produite sur le serveur`,
        status: 500,
      })
    }
  },
  async showClassesHavSubject(req, res) {
    try {
      const idsubjects = parseInt(req.params.idsubjects, 10)
      console.log(idsubjects)
      const subject = await Subjects.findByPk(idsubjects)
      if (!subject) {
        return res.status(404).send({
          error: "la subject n'existe pas ou a été supprimé",
          status: 404,
        })
      }

      const subjectHasClasses = await subject.getClasses()
      const count = await subject.countClasses()
      return res.status(200).send({
        count,
        subjectHasClasses,
      })
    } catch (errors) {
      return res.status(500).send({
        error: `Une erreur s'est produite sur le serveur`,
        status: 500,
      })
    }
  },
  // stat document et corrigé
  async showSubjectsInClasseNstat(req, res) {
    try {
      const subjectHasClasses = []
      const idclasses = parseInt(req.params.idclasses, 10)
      const classe = await Classes.findByPk(idclasses)
      if (!classe) {
        return res.status(404).send({
          error: "la classe n'existe pas ou a été supprimé",
          status: 404,
        })
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
      return res.status(200).send({
        count,
        subjectHasClasses,
      })
    } catch (errors) {
      return res.status(500).send({
        error: `Une erreur s'est produite sur le serveur ${errors}`,
        status: 500,
      })
    }
  },
  async showClassesHavSubjectNstat(req, res) {
    try {
      const idsubjects = parseInt(req.params.idsubjects, 10)
      console.log(idsubjects)
      const subject = await Subjects.findByPk(idsubjects)
      if (!subject) {
        return res.status(404).send({
          error: "la matière n'existe pas ou a été supprimé",
          status: 404,
        })
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
      return res.status(200).send({
        count,
        subjectHasClasses,
      })
    } catch (errors) {
      return res.status(500).send({
        error: `Une erreur s'est produite sur le serveur`,
        status: 500,
      })
    }
  },
}
