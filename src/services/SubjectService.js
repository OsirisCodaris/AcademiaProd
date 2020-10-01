const { Subjects } = require('../models')

module.exports = {
  async create(req, res) {
    try {
      const { name } = req.body
      const subjectVerif = await Subjects.findOne({
        where: {
          name,
        },
      })
      if (subjectVerif) {
        return res.status(400).send({
          message: 'La matière existe déja!',
        })
      }
      const subject = await Subjects.create({
        name,
      })
      return res.status(201).send({
        idsubjects: subject.idsubjects,
      })
    } catch (errors) {
      return res
        .status(500)
        .send({ error: "Une erreur s'est produite", status: 500 })
    }
  },
  async delete(req, res) {
    try {
      console.log(req.params)
      const id = parseInt(req.params.id, 10)
      const subjectVerif = await Subjects.findOne({
        where: {
          idsubjects: id,
        },
      })
      if (!subjectVerif) {
        return res.status(400).send({
          message: "La matière n'existe pas ou a été supprimé!",
        })
      }
      await subjectVerif.destroy()
      return res.sendStatus(204)
    } catch (error) {
      return res
        .status(500)
        .send({ error: `Une erreur s'est produite`, status: 500 })
    }
  },
  async update(req, res) {
    try {
      const id = parseInt(req.params.id, 10)
      const subject = await Subjects.findByPk(id)
      if (!subject) {
        return res.status(400).send({
          error: "la matière n'existe pas ou a été supprimé",
          status: 400,
        })
      }
      const { name } = req.body
      await subject.update({ name })
      return res.status(200).send({ idsubjects: subject.idsubjects })
    } catch (error) {
      return res
        .status(500)
        .send({ error: `Une erreur s'est produite`, status: 500 })
    }
  },
}
