const { docAnswers } = require('../models')
// const RequestError = require('../config/RequestError')
const ServerError = require('../config/ServerError')
// const sequelize = require('sequelize')

module.exports = {
  async create(doc, DocAns) {
    try {
      const { answerstatus, answerfile } = DocAns
      if (answerfile) {
        const docanswer = await docAnswers.create({
          pathfile: answerfile,
          status: answerstatus,
          iddocuments: doc.iddocuments,
        })
        return docanswer
      }
      return false
    } catch (errors) {
      doc.destroy()
      throw new ServerError(errors)
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
    } catch (errors) {
      throw new ServerError(errors)
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
  async update(id, DocUpdate) {
    try {
      const { answerstatus, answerfile } = DocUpdate

      const docVerif = await docAnswers.findOne({
        where: {
          iddocuments: id,
        },
      })
      if (docVerif) {
        await docVerif.update({
          pathfile: answerfile,
          status: answerstatus,
        })
      } else if (answerfile) {
        await docAnswers.create({
          pathfile: answerfile,
          status: answerstatus,
          iddocuments: id,
        })
      }

      return true
    } catch (errors) {
      throw new ServerError(errors)
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
