const { docAnswers } = require('../models')
// const sequelize = require('sequelize')

module.exports = {
  async created(req, res, next) {
    try {
      const { answerstatus, answerfile } = req.body
      if (answerfile) {
        const docanswer = await docAnswers.create({
          pathfile: answerfile,
          status: answerstatus,
          iddocuments: req.doc.iddocuments,
        })
        req.docAnswer = docanswer
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
  async showAll(req, res) {
    try {
      const offset = req.query.offset ? parseInt(req.query.offset, 10) : 0
      const docs = await docAnswers.findAndCountAll({
        offset,
        limit: 10,
      })
      return res.send({
        count: docs.count,
        docs: docs.rows,
      })
    } catch (error) {
      return res.status(500).send({
        error: `Une erreur s'est produite sur le serveur`,
      })
    }
  },
  async show(req, res) {
    try {
      const doc = await docAnswers.findByPk(req.params.id)
      if (doc.price) {
        // on verifie si l'utilisateur a le droit de lire le document
        const { user } = req
        const userHasSubscribe = user.Subscription.expiredDate() // true si l'utilisateur est a un abonnement valide
        const usercanReadit = await user.hasUserBuy(doc) // true s'il a payer le livre
        if (!userHasSubscribe && !usercanReadit) {
          // On entre ici s'il ne peut pas consulter le document c-a-d l'abonnement n'est plus valide et il n'a pas payer le document
          return res.status(403).send({
            error:
              'Désolée vous ne pouvez pas accéder a cette ressource sans abonnement ou achat effectuer',
          })
        }
        // enregistre la lecture de l'utilisateur
        await doc.adddocAnswersRead(user)
      }
      return res.send(doc.toJSON())
    } catch (error) {
      return res.status(400).send({
        error: "Le document n'existe pas ou a été supprimé",
      })
    }
  },
  async updated(req, res, next) {
    try {
      const { answerstatus, answerfile } = req.body

      const docVerif = await docAnswers.findOne({
        where: {
          iddocuments: req.doc.iddocuments,
        },
      })
      if (docVerif) {
        await docAnswers.update(req.body, {
          where: {
            iddocuments: req.params.id,
          },
        })
      } else {
        await docAnswers.create({
          pathfile: answerfile,
          status: answerstatus,
          iddocuments: req.doc.iddocuments,
        })
      }

      return next()
    } catch (error) {
      return res.status(500).send({
        error: `Une erreur s'est produite`,
      })
    }
  },
  async deleted(req, res) {
    try {
      const doc = await docAnswers.destroy({
        where: {
          iddocuments: req.params.id,
        },
      })
      if (doc) {
        return res.sendStatus(204)
      }
      return res.status(400).send({
        error: "Le document n'existe pas ou a été supprimé",
      })
    } catch (error) {
      return res.status(500).send({
        error: `Une erreur s'est produite`,
      })
    }
  },
}
