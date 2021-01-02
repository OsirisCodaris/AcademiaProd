const { Admins, Users } = require('../models')
const UserService = require('./UserService')
const config = require('../config/config')
const RequestError = require('../config/RequestError')
const ServerError = require('../config/ServerError')

module.exports = {
  async create(AdminCreate) {
    try {
      const user = await UserService.create(AdminCreate.user)
      const role = config.admin.includes(AdminCreate.admin.role)
      if (!role) {
        const error = new RequestError(`Utilisateur`)
        error.noRole()
        throw error
      }
      const admin = await Admins.create({
        role: AdminCreate.admin.role,
        idadmins: user.idusers,
      })
      return admin
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
  async showAll() {
    try {
      const admin = await Admins.findAndCountAll({
        include: [
          {
            model: Users,
          },
        ],
      })
      return admin
    } catch (errors) {
      throw new ServerError(errors)
    }
  },
  async delete(id) {
    try {
      const adminVerif = await Admins.findOne({
        where: {
          idadmins: id,
        },
      })
      if (!adminVerif) {
        const error = new RequestError(`Utilisateur`)
        error.notExistOrDelete()
        throw error
      }
      await adminVerif.destroy()
      return true
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
  async update(id, AdminUpdate) {
    try {
      const { role } = AdminUpdate.admin
      const verifrole = config.admin.includes(AdminUpdate.admin.role)
      if (!verifrole) {
        const error = new RequestError(`Utilisateur`)
        error.noRole()
        throw error
      }

      const adminVerif = await Admins.findOne({
        where: {
          idadmins: id,
        },
      })
      if (!adminVerif) {
        const error = new RequestError(`Utilisateur`)
        error.notExistOrDelete()
        throw error
      }
      if (role) {
        await UserService.update(id, AdminUpdate.user)
        await adminVerif.update({
          role,
        })
      }
      return true
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
}
