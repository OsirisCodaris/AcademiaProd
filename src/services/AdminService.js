const { Admins } = require('../models')
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
}
