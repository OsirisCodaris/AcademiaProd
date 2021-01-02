const { Notions } = require('../models')
const ServerError = require('../config/ServerError')
// const sequelize = require('sequelize')

module.exports = {
  async create(doc, DocCreate) {
    try {
      const { notions } = DocCreate
      if (notions) {
        await Notions.create({
          notions,
          iddocuments: doc.iddocuments,
        })
        return true
      }
      return false
    } catch (errors) {
      doc.destroy()
      throw new ServerError(errors)
    }
  },
  async update(id, DocUpdate) {
    try {
      const { notions } = DocUpdate
      if (!notions) {
        return false
      }
      const notion = await Notions.findOne({
        where: {
          iddocuments: id,
        },
      })

      if (notion) {
        await notion.update({
          notions,
        })
      } else {
        await Notions.create({
          notions,
          iddocuments: id,
        })
      }

      return true
    } catch (errors) {
      throw new ServerError(errors)
    }
  },
}
