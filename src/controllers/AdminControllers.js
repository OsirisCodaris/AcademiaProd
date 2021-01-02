const AdminService = require('../services/AdminService')

// const config = require('../config/config')

module.exports = {
  async create(req, res, next) {
    try {
      const admin = await AdminService.create(req.body)
      return res.status(201).send({
        user: admin.idadmins,
      })
    } catch (errors) {
      return next(errors)
    }
  },
  async showAll(req, res, next) {
    try {
      const admin = await AdminService.showAll()
      return res.send(admin)
    } catch (errors) {
      return next(errors)
    }
  },
  async update(req, res, next) {
    try {
      const adminId = parseInt(req.params.id, 10)
      const admin = await AdminService.update(adminId, req.body)
      return res.status(201).send({
        user: admin.idadmins,
      })
    } catch (errors) {
      return next(errors)
    }
  },
  async delete(req, res, next) {
    try {
      const adminId = parseInt(req.params.id, 10)
      await AdminService.delete(adminId)
      return res.sendStatus(204)
    } catch (errors) {
      return next(errors)
    }
  },
}
