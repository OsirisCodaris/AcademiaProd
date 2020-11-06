const { Admins, Users } = require('../models')
const config = require('../config/config')

module.exports = {
  async create(req, res) {
    try {
      const role = config.admin.includes(req.body.admin.role)
      if (!role) {
        return res.status(400).send({
          error: "Le role n'est pas défini",
          status: 400,
        })
      }
      await Admins.create({
        role: req.body.admin.role,
        idadmins: req.user.idusers,
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
  async showAll(req, res) {
    try {
      const admin = await Admins.findAndCountAll({
        include: [
          {
            model: Users,
          },
        ],
      })
      return res.send(admin)
    } catch (error) {
      return res.status(500).send({
        error: `Une erreur s'est produite sur le serveur`,
      })
    }
  },
  async delete(req, res) {
    try {
      console.log(req.params)
      const id = parseInt(req.params.id, 10)
      const adminVerif = await Admins.findOne({
        where: {
          idadmins: id,
        },
      })
      if (!adminVerif) {
        return res.status(404).send({
          error: "L'administrateur n'existe pas ou a été supprimé!",
          status: 404,
        })
      }
      await adminVerif.destroy()
      return res.sendStatus(204)
    } catch (error) {
      return res
        .status(500)
        .send({ error: `Une erreur s'est produite`, status: 500 })
    }
  },
  async updated(req, res) {
    try {
      console.log(req.params)
      const { role } = req.body.admin
      const verifrole = config.admin.includes(req.body.admin.role)
      if (!verifrole) {
        return res.status(400).send({
          error: "Le role n'est pas défini",
          status: 400,
        })
      }
      const id = parseInt(req.params.id, 10)
      const adminVerif = await Admins.findOne({
        where: {
          idadmins: id,
        },
      })
      if (!adminVerif) {
        return res.status(404).send({
          error: "L'administrateur n'existe pas ou a été supprimé!",
          status: 404,
        })
      }
      if (role) {
        await adminVerif.update({
          role,
        })
      }
      return res.sendStatus(204)
    } catch (error) {
      return res
        .status(500)
        .send({ error: `Une erreur s'est produite${error}`, status: 500 })
    }
  },
}
