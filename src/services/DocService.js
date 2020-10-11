const fs = require('fs')
const path = require('path')
const { Documents, typeDocs, docAnswers } = require('../models')
const config = require('../config/config')
// const sequelize = require('sequelize')

module.exports = {
  async created(req, res, next) {
    try {
      const { name } = req.body
      const docVerif = await Documents.findOne({
        where: {
          name,
        },
      })
      const typeDocVerif = await typeDocs.findByPk(req.body.idtypedocs)
      if (!typeDocVerif) {
        fs.unlink(path.join(config.doc.path, req.body.pathfile), (err) => {
          if (err) {
            /* do something */
          }
        })
        return res.status(400).send({
          error: 'le type du document est invalide!',
          status: 400,
        })
      }
      if (docVerif) {
        // suppression des fichier transfererdans le serveur au cas ou la création n'aboutit pas
        fs.unlink(path.join(config.doc.path, req.body.pathfile), (err) => {
          if (err) {
            /* do something */
          }
        })
        return res.status(400).send({
          error: 'Un document a déja le même nom!',
          status: 400,
        })
      }
      const doc = await Documents.create(req.body)
      req.doc = doc
      return next()
    } catch (error) {
      return res.status(500).send({
        error: `Une erreur s'est produite`,
        status: 500,
      })
    }
  },
  async showAll(req, res) {
    try {
      const offset = req.query.offset ? parseInt(req.query.offset, 10) : 0
      const docs = await Documents.findAndCountAll({
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
      const doc = await Documents.findByPk(req.params.id, {
        include: [
          {
            model: docAnswers,
          },
        ],
      })
      /* if (doc.price) {
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
        await doc.addDocumentsRead(user)
      } */
      return res.send({ doc })
    } catch (error) {
      return res.status(500).send({
        error: `Une erreur s'est produite sur le serveur`,
        status: 500,
      })
    }
  },
  async updated(req, res) {
    try {
      const docVerif = await Documents.findByPk(req.params.id)
      if (!docVerif) {
        return res.status(400).send({
          error: `Le document n'existe pas ou a été supprimé`,
        })
      }
      const doc = await Documents.update(req.body, {
        where: {
          iddocuments: req.params.id,
        },
      })
      console.log(doc)

      return res.sendStatus(204)
    } catch (error) {
      return res.status(500).send({
        error: `Une erreur s'est produite`,
      })
    }
  },
  async deleted(req, res) {
    try {
      const doc = await Documents.destroy({
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
        error: `Une erreur s'est produite${error}`,
      })
    }
  },
}
