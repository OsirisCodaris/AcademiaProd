const { typeDocs } = require('../models')

module.exports = {
  async create(req, res) {
    try {
      const { name } = req.body
      const typeDocVerif = await typeDocs.findOne({
        where: {
          name,
        },
      })
      if (typeDocVerif) {
        return res.status(400).send({
          error: 'La catégories existe déja!',
          status: 400,
        })
      }
      const type = await typeDocs.create({
        name,
      })
      return res.status(201).send({
        idtypedocs: type.idtypedocs,
      })
    } catch (errors) {
      return res
        .status(500)
        .send({ error: "Une erreur s'est produite", status: 500 })
    }
  },
  async showAll(req, res) {
    try {
      const typedocs = await typeDocs.findAndCountAll()
      return res.status(201).send(typedocs)
    } catch (errors) {
      return res
        .status(400)
        .send({ error: `Une erreur s'est produite`, status: 400 })
    }
  },
  async update(req, res) {
    try {
      const id = parseInt(req.params.id, 10)
      const typeDoc = await typeDocs.findByPk(id)
      if (!typeDoc) {
        return res.status(404).send({
          error: "la catégories n'existe pas ou a été supprimé",
          status: 404,
        })
      }
      const { name } = req.body
      const nameVerif = await typeDocs.findOne({ where: { name } })
      if (nameVerif && nameVerif.name !== typeDoc.name) {
        return res.status(400).send({
          error: 'Ce nom est déja attribué à un type de document',
          status: 400,
        })
      }
      await typeDoc.update({ name })
      return res.status(200).send({ idtypedocs: typeDoc.idtypedocs })
    } catch (error) {
      return res
        .status(500)
        .send({ error: "Une erreur s'est produite", status: 500 })
    }
  },
  async delete(req, res) {
    try {
      const id = parseInt(req.params.id, 10)
      const typeDocVerif = await typeDocs.findByPk(id)
      if (!typeDocVerif) {
        return res.status(404).send({
          error: "La catégories n'existe pas ou a été supprimé!",
          status: 404,
        })
      }
      await typeDocVerif.destroy()
      return res.sendStatus(204)
    } catch (error) {
      return res
        .status(500)
        .send({ error: `Une erreur s'est produite`, status: 500 })
    }
  },
}
