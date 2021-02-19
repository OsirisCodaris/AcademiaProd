const { Notifications } = require('../models')
const ServerError = require('../config/ServerError')
// const sequelize = require('sequelize')

module.exports = {
  async associate(idusers, idproblems, tokenfcm) {
    try {
      const notif = await Notifications.findOne({
        where: {
          idusers,
          idproblems,
        },
      })
      if (notif) {
        await notif.destroy()
        return false
      }
      await Notifications.create({
        idusers,
        idproblems,
        tokenfcm,
      })
      return true
    } catch (errors) {
      console.log(errors)
      throw new ServerError(errors)
    }
  },
  async updateToken(idusers, tokenfcm) {
    try {
      const notif = await Notifications.findAll({
        where: {
          idusers,
        },
      })
      notif.forEach((element) => {
        element.update({ tokenfcm })
      })

      return true
    } catch (errors) {
      throw new ServerError(errors)
    }
  },
  async getTokenProblem(idproblems) {
    try {
      const notifs = await Notifications.findAll({
        attributes: ['tokenfcm'],
        where: {
          idproblems,
        },
      })

      return notifs
    } catch (errors) {
      throw new ServerError(errors)
    }
  },
  async showNotif(idusers, idproblems) {
    try {
      const notif = await Notifications.findOne({
        where: {
          idusers,
          idproblems,
        },
      })
      if (notif) {
        return true
      }
      return false
    } catch (errors) {
      throw new ServerError(errors)
    }
  },
}
