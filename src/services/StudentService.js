const { Students, Classes } = require('../models')

module.exports = {
  async create(req, res) {
    try {
      const classe = await Classes.findByPk(req.body.student.idclasses)
      if (!classe) {
        return res.status(400).send({
          error: "La classe n'existe pas ou a été supprimé",
          status: 400,
        })
      }
      await Students.create({
        idclasses: classe.idclasses,
        idstudents: req.user.idusers,
      })
      return res.status(201).send({
        user: req.user.idusers,
      })
    } catch (errors) {
      return res
        .status(400)
        .send({ error: "Une erreur s'est produite", status: 400 })
    }
  },
  async updated(req, res) {
    try {
      /* do something later */
      return res.sendStatus(204)
    } catch (error) {
      return res
        .status(500)
        .send({ error: `Une erreur s'est produite${error}`, status: 500 })
    }
  }
}
