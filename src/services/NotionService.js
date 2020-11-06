const { Notions } = require('../models')
// const sequelize = require('sequelize')

module.exports = {
  async created(req, res, next) {
    try {
      const { notions } = req.body
      if (notions) {
        await Notions.create({
          notions,
          iddocuments: req.doc.iddocuments,
        })
      }
      return next()
    } catch (error) {
      req.doc.destroy()
      return res.status(500).send({
        error: `Une erreur s'est produite`,
        status: 500,
      })
    }
  },
  async updated(req, res, next) {
    try {
      const { notions } = req.body

      const notion = await Notions.findOne({
        where: {
          iddocuments: req.params.id,
        },
      })

      if (notion) {
        await notion.update({
          notions,
        })
      } else {
        await Notions.create({
          notions,
          iddocuments: req.params.id,
        })
      }

      return next()
    } catch (error) {
      return res.status(500).send({
        error: `Une erreur s'est produite  -${error}`,
      })
    }
  },
}
