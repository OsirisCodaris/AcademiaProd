const { Classes, Subjects } = require('../models')

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
        // si on modifie les association d'une classe avec des matières on réinitialise
        await classe.setSubjects(null)
        // On parcours le tableau reçu et on ajoute les association entre les matiere et les classe
        for (const element of idsubjects) {
          const subject = await Subjects.findByPk(element)
          if (!subject) {
            errors.push(element)
          }
          await classe.addSubjects(subject)
        }
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
      console.log(idclasses)
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
}
