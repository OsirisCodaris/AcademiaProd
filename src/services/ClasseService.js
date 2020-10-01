const { Classes } = require('../models')

module.exports = {
  async create(req, res) {
    try {
      const { name } = req.body
      const classeVerif = await Classes.findOne({
        where: {
          name,
        },
      })
      if (classeVerif) {
        return res.status(400).send({
          message: 'La classe existe déja!',
        })
      }
      const classe = await Classes.create({
        name,
      })
      return res.status(201).send({
        idclasses: classe.idclasses,
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
      const classeVerif = await Classes.findOne({
        where: {
          idclasses: id,
        },
      })
      if (!classeVerif) {
        return res.status(400).send({
          message: "La classe n'existe pas ou a été supprimé!",
        })
      }
      await classeVerif.destroy()
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
      const classe = await Classes.findByPk(id)
      if (!classe) {
        return res.status(400).send({
          error: "la classe n'existe pas ou a été supprimé",
          status: 400,
        })
      }
      const { name } = req.body
      await classe.update({ name })
      return res.status(200).send({ idclasses: classe.idclasses })
    } catch (error) {
      return res
        .status(500)
        .send({ error: "Une erreur s'est produite", status: 500 })
    }
  },
}
